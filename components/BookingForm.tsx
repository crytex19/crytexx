'use client';

import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/lib/config';

const STORAGE_KEY = 'ba_booking_v1';
const STEP_COUNT = 6; // 5 input steps + review

export default function BookingForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const startTimeRef = useRef(Date.now());
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [guestBand, setGuestBand] = useState(1);
  const [notesLen, setNotesLen] = useState(0);
  const [dateDisabled, setDateDisabled] = useState(false);
  const [showOtherField, setShowOtherField] = useState(false);
  const [review, setReview] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  // restore any saved draft on mount
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const data = JSON.parse(raw) as Record<string, string | string[]>;
      Object.entries(data).forEach(([key, val]) => {
        const els = form.querySelectorAll<HTMLInputElement>(`[name="${CSS.escape(key)}"]`);
        if (!els.length) return;
        const values = Array.isArray(val) ? val : [val];
        els.forEach((el) => {
          if (el.type === 'checkbox' || el.type === 'radio') {
            el.checked = values.includes(el.value);
            el.closest('.select-card')?.classList.toggle('is-selected', el.checked);
          } else {
            el.value = values[0] ?? '';
          }
        });
      });
      const otherCb = form.querySelector<HTMLInputElement>('[value="Something else"]');
      if (otherCb?.checked) setShowOtherField(true);
      const guest = form.querySelector<HTMLInputElement>('#guest-count');
      if (guest) setGuestBand(Number(guest.value));
      const notes = form.querySelector<HTMLTextAreaElement>('#style-notes');
      if (notes) setNotesLen(notes.value.length);
    } catch {
      /* ignore malformed saved state */
    }
  }, []);

  const saveState = () => {
    const form = formRef.current;
    if (!form) return;
    const data: Record<string, string | string[]> = {};
    new FormData(form).forEach((v, k) => {
      const value = String(v);
      if (data[k] !== undefined) {
        data[k] = Array.isArray(data[k]) ? [...(data[k] as string[]), value] : [data[k] as string, value];
      } else {
        data[k] = value;
      }
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const validateStep = (i: number) => {
    const form = formRef.current;
    if (!form) return true;
    const step = form.querySelector<HTMLElement>(`[data-step="${i}"]`);
    if (!step) return true;
    let valid = true;
    const nextErrors: Record<string, boolean> = {};
    step.querySelectorAll<HTMLInputElement>('[required]').forEach((field) => {
      const isRadioOrCheckbox = field.type === 'radio' || field.type === 'checkbox';
      let fieldValid: boolean;
      if (isRadioOrCheckbox) {
        fieldValid = form.querySelectorAll(`[name="${CSS.escape(field.name)}"]:checked`).length > 0;
      } else {
        fieldValid = field.value.trim() !== '';
      }
      if (!fieldValid) valid = false;
      nextErrors[field.name] = !fieldValid;
    });
    setErrors((prev) => ({ ...prev, ...nextErrors }));
    return valid;
  };

  const renderReview = () => {
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);
    const groups: Record<string, string> = {};
    form.querySelectorAll<HTMLElement>('[data-review-group]').forEach((group) => {
      const fields = group.dataset.reviewGroup!.split(',');
      const values = fields.map((f) => data.getAll(f.trim()).filter(Boolean).map(String)).flat();
      groups[group.dataset.reviewGroup!] = values.length ? values.join(', ') : '—';
    });
    setReview(groups);
  };

  const goTo = (i: number) => {
    setCurrent(i);
    if (i === STEP_COUNT - 1) renderReview();
  };

  const handleNext = () => {
    if (!validateStep(current)) return;
    saveState();
    if (current < STEP_COUNT - 1) goTo(current + 1);
  };
  const handlePrev = () => goTo(current - 1);
  const handleGoto = (i: number) => goTo(i);

  const toggleSelectCard = (e: React.MouseEvent<HTMLLabelElement>, groupMax?: number) => {
    const input = e.currentTarget.querySelector('input') as HTMLInputElement | null;
    if (!input) return;
    if (input.type === 'checkbox') {
      if (groupMax) {
        const group = e.currentTarget.closest('[data-max-select]');
        const checkedCount = group?.querySelectorAll('input:checked').length ?? 0;
        if (!input.checked && checkedCount >= groupMax) {
          e.preventDefault();
          return;
        }
      }
    }
  };

  const buildWhatsAppMessage = (data: FormData) => {
    const get = (k: string) => data.getAll(k).filter(Boolean).join(', ') || '—';
    const bands = siteConfig.booking.guestBands;
    const guestReadout = bands[Number(data.get('guest_band') ?? 1)] ?? get('guest_band');
    const lines = [
      'New consultation request from the website:',
      `Celebrating: ${get('event_type')}${data.get('event_type_other') ? ' (' + data.get('event_type_other') + ')' : ''}`,
      `Date: ${data.get('date_not_set') ? 'not set yet' : get('event_date')}`,
      `Venue: ${get('venue_city')}${data.get('venue_name') ? ' — ' + data.get('venue_name') : ''} (${get('setting')})`,
      `Guests: ${guestReadout}`,
      `Look: ${get('style')}`,
      `Budget: ${get('budget')}`,
      `Name: ${get('full_name')}`,
      `Phone: ${get('phone')}`,
      `Email: ${get('email')}`,
      `Preferred contact: ${get('contact_method')}`
    ];
    return lines.join('\n');
  };

  const whatsAppUrl = (data: FormData) => {
    const digits = siteConfig.business.phone.replace(/[^\d]/g, '');
    if (!digits) return null;
    return `https://wa.me/${digits}?text=${encodeURIComponent(buildWhatsAppMessage(data))}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(current)) return;
    const form = formRef.current;
    if (!form) return;

    const honeypot = form.querySelector<HTMLInputElement>('[name="_gotcha"]');
    const elapsed = Date.now() - startTimeRef.current;
    if ((honeypot && honeypot.value !== '') || elapsed < 2500) return;

    const data = new FormData(form);
    const url = whatsAppUrl(data) || siteConfig.business.instagramUrl;
    window.open(url, '_blank', 'noopener');

    localStorage.removeItem(STORAGE_KEY);
    setSubmitted(true);

    fetch(siteConfig.business.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } }).catch(() => {});
  };

  const pct = current >= STEP_COUNT - 1 ? 100 : (current / (STEP_COUNT - 2)) * 100;
  const stepLabel = current === STEP_COUNT - 1 ? 'Review your answers' : `Step ${current + 1} of ${STEP_COUNT - 1}`;
  const whatsappFallback = (() => {
    const digits = siteConfig.business.phone.replace(/[^\d]/g, '');
    return digits ? `https://wa.me/${digits}` : siteConfig.business.instagramUrl;
  })();

  return (
    <section id="book" className="booking wash-trigger">
      <div className="wash wash--blush" aria-hidden="true"></div>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Book a Consultation</p>
          <h2 className="section-title mask-wrap">
            <span className="mask-line">About 90 seconds</span>
          </h2>
          <p style={{ color: 'var(--ink-soft)', marginTop: '0.75rem' }}>
            Five short steps. Skip anything you&rsquo;re not sure of yet &mdash; we&rsquo;ll fill in the gaps on the call.
          </p>
        </div>

        <form className={`booking-form${submitted ? ' is-submitted' : ''}`} noValidate ref={formRef} onSubmit={handleSubmit}>
          {!submitted && (
            <div className="form-progress">
              <span className="progress__label">{stepLabel}</span>
              <div className="progress__track">
                <div className="progress__fill" style={{ width: `${pct}%` }}></div>
              </div>
            </div>
          )}

          <div className="honeypot-field">
            <label htmlFor="_gotcha">Leave this field empty</label>
            <input type="text" id="_gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" />
          </div>

          {/* STEP 1 */}
          <fieldset className="form-step" data-step="0" hidden={submitted || current !== 0}>
            <legend>What are we celebrating?</legend>
            <p className="form-step__hint">Pick as many as apply.</p>
            <div className="select-cards">
              {siteConfig.booking.eventTypes.map((opt) => (
                <label
                  className="select-card"
                  key={opt.value}
                  onClick={(e) => {
                    toggleSelectCard(e);
                    if (opt.value === 'Something else') {
                      requestAnimationFrame(() => {
                        const cb = formRef.current?.querySelector<HTMLInputElement>('[value="Something else"]');
                        setShowOtherField(Boolean(cb?.checked));
                      });
                    }
                  }}
                >
                  <input type="checkbox" name="event_type" value={opt.value} onChange={(e) => e.currentTarget.closest('.select-card')?.classList.toggle('is-selected', e.currentTarget.checked)} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={opt.image} alt="" loading="lazy" />
                  <span className="select-card__check"></span>
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
            <div className="field event-type-other" hidden={!showOtherField}>
              <label htmlFor="event-type-other-text">Tell us more</label>
              <input type="text" id="event-type-other-text" name="event_type_other" />
            </div>
            <div className="form-nav">
              <span></span>
              <button type="button" className="btn btn--primary" onClick={handleNext}>
                <span>Next</span>
              </button>
            </div>
          </fieldset>

          {/* STEP 2 */}
          <fieldset className="form-step" data-step="1" hidden={submitted || current !== 1}>
            <legend>When and where</legend>
            <div className="field">
              <label htmlFor="event-date">Event date</label>
              <input type="date" id="event-date" name="event_date" disabled={dateDisabled} />
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontWeight: 400 }}>
                <input
                  type="checkbox"
                  id="date-not-set"
                  name="date_not_set"
                  onChange={(e) => {
                    setDateDisabled(e.currentTarget.checked);
                    if (e.currentTarget.checked && formRef.current) {
                      const dateInput = formRef.current.querySelector<HTMLInputElement>('#event-date');
                      if (dateInput) dateInput.value = '';
                    }
                  }}
                />{' '}
                Date not set yet
              </label>
            </div>
            <div className="field">
              <label htmlFor="event-count">
                Number of separate events <span className="field__optional">(needing d&eacute;cor)</span>
              </label>
              <input type="number" id="event-count" name="event_count" min={1} max={6} defaultValue={1} inputMode="numeric" />
            </div>
            <div className="field">
              <label htmlFor="venue-name">
                Venue name <span className="field__optional">(optional)</span>
              </label>
              <input type="text" id="venue-name" name="venue_name" autoComplete="off" />
              <p className="field__helper">Leave blank if you&rsquo;re still deciding.</p>
            </div>
            <div className="field">
              <label htmlFor="venue-city">Venue city / town</label>
              <input type="text" id="venue-city" name="venue_city" autoComplete="address-level2" />
            </div>
            <div className="field">
              <label>Setting</label>
              <div className="segmented">
                <input type="radio" name="setting" value="Indoor" id="setting-indoor" />
                <label htmlFor="setting-indoor">Indoor</label>
                <input type="radio" name="setting" value="Outdoor" id="setting-outdoor" />
                <label htmlFor="setting-outdoor">Outdoor</label>
                <input type="radio" name="setting" value="Tent" id="setting-tent" />
                <label htmlFor="setting-tent">Tent</label>
                <input type="radio" name="setting" value="Not sure yet" id="setting-unsure" />
                <label htmlFor="setting-unsure">Not sure yet</label>
              </div>
            </div>
            <div className="form-nav">
              <button type="button" className="btn btn--ghost" onClick={handlePrev}>
                <span>Back</span>
              </button>
              <button type="button" className="btn btn--primary" onClick={handleNext}>
                <span>Next</span>
              </button>
            </div>
          </fieldset>

          {/* STEP 3 */}
          <fieldset className="form-step" data-step="2" hidden={submitted || current !== 2}>
            <legend>Scale and logistics</legend>
            <div className="field slider-field">
              <label htmlFor="guest-count">Estimated guest count</label>
              <input
                type="range"
                id="guest-count"
                name="guest_band"
                min={0}
                max={4}
                step={1}
                value={guestBand}
                onChange={(e) => setGuestBand(Number(e.currentTarget.value))}
              />
              <span className="guest-readout">{siteConfig.booking.guestBands[guestBand]}</span>
            </div>
            <div className="field">
              <label htmlFor="start-time">Event start time</label>
              <input type="text" id="start-time" name="start_time" placeholder="e.g. 6:00 PM" inputMode="text" />
            </div>
            <div className="field">
              <label htmlFor="access-time">Setup access time</label>
              <input type="text" id="access-time" name="access_time" placeholder="e.g. 9:00 AM" />
            </div>
            <div className="field">
              <label htmlFor="breakdown-time">Breakdown time</label>
              <input type="text" id="breakdown-time" name="breakdown_time" placeholder="e.g. midnight" />
            </div>
            <div className="toggle-row">
              <div className="toggle-row__text">
                <strong>Same-day flip needed?</strong>
                <span>Ceremony and reception in the same room, reset in between.</span>
              </div>
              <label className="switch">
                <input type="checkbox" name="same_day_flip" />
                <span className="switch__track"></span>
              </label>
            </div>
            <div className="toggle-row">
              <div className="toggle-row__text">
                <strong>Overnight setup needed?</strong>
                <span>We install the evening before rather than same-day.</span>
              </div>
              <label className="switch">
                <input type="checkbox" name="overnight_setup" />
                <span className="switch__track"></span>
              </label>
            </div>
            <div className="form-nav">
              <button type="button" className="btn btn--ghost" onClick={handlePrev}>
                <span>Back</span>
              </button>
              <button type="button" className="btn btn--primary" onClick={handleNext}>
                <span>Next</span>
              </button>
            </div>
          </fieldset>

          {/* STEP 4 */}
          <fieldset className="form-step" data-step="3" hidden={submitted || current !== 3}>
            <legend>The look, and the budget</legend>
            <p className="form-step__hint">Pick up to three.</p>
            <div className="select-cards moodboard-cards" data-max-select={3}>
              {siteConfig.booking.styles.map((opt) => (
                <label className="select-card" key={opt.value} onClick={(e) => toggleSelectCard(e, 3)}>
                  <input type="checkbox" name="style" value={opt.value} onChange={(e) => e.currentTarget.closest('.select-card')?.classList.toggle('is-selected', e.currentTarget.checked)} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={opt.image} alt="" loading="lazy" />
                  <span className="select-card__check"></span>
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
            <div className="field" style={{ marginTop: '1.5rem' }}>
              <label htmlFor="style-notes">
                Anything specific you&rsquo;re picturing? <span className="field__optional">(optional)</span>
              </label>
              <textarea id="style-notes" name="style_notes" maxLength={300} onChange={(e) => setNotesLen(e.currentTarget.value.length)} />
              <span className="notes-counter field__helper">{notesLen} / 300</span>
            </div>
            <div className="field">
              <label>Investment range</label>
              <div className="segmented">
                {siteConfig.booking.budgetOptions.map((opt, i) => (
                  <span key={opt} style={{ display: 'contents' }}>
                    <input type="radio" name="budget" value={opt} id={`budget-${i + 1}`} />
                    <label htmlFor={`budget-${i + 1}`}>{opt}</label>
                  </span>
                ))}
              </div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem', fontSize: '0.9rem' }}>
              <input type="checkbox" name="outside_area" /> My event is outside NYC / Long Island
            </label>
            <p className="field__helper">Travel and lodging may be additional.</p>
            <div className="form-nav">
              <button type="button" className="btn btn--ghost" onClick={handlePrev}>
                <span>Back</span>
              </button>
              <button type="button" className="btn btn--primary" onClick={handleNext}>
                <span>Next</span>
              </button>
            </div>
          </fieldset>

          {/* STEP 5 */}
          <fieldset className="form-step" data-step="4" hidden={submitted || current !== 4}>
            <legend>How to reach you</legend>
            <div className="field">
              <label htmlFor="full-name">Full name(s)</label>
              <input type="text" id="full-name" name="full_name" required autoComplete="name" />
              <span className="field__error" data-error-for="full_name" hidden={!errors.full_name}>
                Please share a name.
              </span>
            </div>
            <div className="field">
              <label htmlFor="email-address">Email</label>
              <input type="email" id="email-address" name="email" required autoComplete="email" inputMode="email" />
              <span className="field__error" data-error-for="email" hidden={!errors.email}>
                Please share a valid email.
              </span>
            </div>
            <div className="field">
              <label htmlFor="phone-number">Phone</label>
              <input type="tel" id="phone-number" name="phone" required autoComplete="tel" inputMode="tel" />
              <span className="field__error" data-error-for="phone" hidden={!errors.phone}>
                Please share a phone number.
              </span>
            </div>
            <div className="field">
              <label>Preferred contact method</label>
              <div className="segmented">
                <input type="radio" name="contact_method" value="Email" id="cm-email" />
                <label htmlFor="cm-email">Email</label>
                <input type="radio" name="contact_method" value="Phone" id="cm-phone" />
                <label htmlFor="cm-phone">Phone</label>
                <input type="radio" name="contact_method" value="Text" id="cm-text" />
                <label htmlFor="cm-text">Text</label>
                <input type="radio" name="contact_method" value="WhatsApp" id="cm-whatsapp" />
                <label htmlFor="cm-whatsapp">WhatsApp</label>
              </div>
            </div>
            <div className="field">
              <label htmlFor="how-found">How did you find us?</label>
              <select id="how-found" name="how_found" defaultValue={siteConfig.booking.howFoundOptions[0]}>
                {siteConfig.booking.howFoundOptions.map((opt) => (
                  <option value={opt} key={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="anything-else">
                Anything else we should know? <span className="field__optional">(optional)</span>
              </label>
              <textarea id="anything-else" name="notes" />
            </div>
            <div className="form-nav">
              <button type="button" className="btn btn--ghost" onClick={handlePrev}>
                <span>Back</span>
              </button>
              <button type="button" className="btn btn--primary" onClick={handleNext}>
                <span>Review</span>
              </button>
            </div>
          </fieldset>

          {/* STEP 6: REVIEW */}
          <fieldset className="form-step" data-step="5" hidden={submitted || current !== 5}>
            <legend>Review &amp; send</legend>
            <div className="review-summary">
              <dl>
                {[
                  { group: 'event_type,event_type_other', label: 'Celebrating', goto: 0 },
                  { group: 'event_date,venue_name,venue_city,setting', label: 'When & where', goto: 1 },
                  { group: 'guest_band,start_time,same_day_flip,overnight_setup', label: 'Scale & logistics', goto: 2 },
                  { group: 'style,budget', label: 'Look & budget', goto: 3 },
                  { group: 'full_name,email,phone,contact_method', label: 'Contact', goto: 4 }
                ].map((row) => (
                  <div className="review-summary__group" key={row.group}>
                    <dt>
                      {row.label}{' '}
                      <button type="button" className="review-summary__edit" onClick={() => handleGoto(row.goto)}>
                        Edit
                      </button>
                    </dt>
                    <dd className="review-summary__values">{review[row.group] ?? '—'}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="form-nav">
              <button type="button" className="btn btn--ghost" onClick={handlePrev}>
                <span>Back</span>
              </button>
              <button type="submit" className="btn btn--primary">
                <span>Send Enquiry</span>
              </button>
            </div>
          </fieldset>

          <div className="form-confirmation" hidden={!submitted}>
            <svg className="confirmation-check" viewBox="0 0 64 64" aria-hidden="true">
              <circle cx="32" cy="32" r="30" />
              <path d="M18 33l10 10 18-20" />
            </svg>
            <h3>Got it &mdash; thank you.</h3>
            <p>We&rsquo;ve opened WhatsApp with your details filled in &mdash; just hit send. Didn&rsquo;t open? Use the button below.</p>
            <div className="btn-row">
              <a className="btn btn--ghost" href={siteConfig.business.instagramUrl} target="_blank" rel="noopener">
                <span>Instagram</span>
              </a>
              <a className="btn btn--primary whatsapp-fallback" href={whatsappFallback} target="_blank" rel="noopener">
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
