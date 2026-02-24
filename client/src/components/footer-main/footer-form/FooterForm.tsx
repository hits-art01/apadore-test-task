import { useState, type ChangeEvent, type FormEvent } from "react";
import "./footer-form.scss";
import SubmitButton from "../../../UI/SubmitButton";
import {
  validateContactForm,
  type FormData,
} from "../../../utils/validateForm";
import { sendContactForm } from "../../../api/form";

const FooterForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
    apartmentType: "1+KK",
    newsletter: false,
    consent: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleApartmentSelect = (type: FormData["apartmentType"]) => {
    setFormData((prev) => ({ ...prev, apartmentType: type }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateContactForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setServerError("");
    setIsSubmitted(false);

    try {
      await sendContactForm(formData);

      setIsSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
        apartmentType: "1+KK",
        newsletter: false,
        consent: false,
      });
      setErrors({});
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="footer-form">
      <form onSubmit={handleSubmit} className="footer-form__container">
        <div className="footer-form__row">
          <div className="footer-form__field">
            <div className="field_label">
              <label className="footer-form__label">Křestní jméno*</label>
              {errors.firstName && (
                <span className="footer-form__error">{errors.firstName}</span>
              )}
            </div>
            <input
              type="text"
              name="firstName"
              placeholder="Vaše jméno"
              value={formData.firstName}
              onChange={handleChange}
              required
              className={errors.firstName ? "error" : ""}
            />
          </div>

          <div className="footer-form__field">
            <div className="field_label">
              <label className="footer-form__label">Příjmení*</label>
              {errors.lastName && (
                <span className="footer-form__error">{errors.lastName}</span>
              )}
            </div>
            <input
              type="text"
              name="lastName"
              placeholder="Vaše příjmení"
              value={formData.lastName}
              onChange={handleChange}
              required
              className={errors.lastName ? "error" : ""}
            />
          </div>
        </div>

        <div className="footer-form__field">
          <div className="field_label">
            <label className="footer-form__label">Telefonní číslo*</label>
            {errors.phone && (
              <span className="footer-form__error">{errors.phone}</span>
            )}
          </div>
          <input
            type="tel"
            name="phone"
            placeholder="Vaše telefonní číslo"
            value={formData.phone}
            onChange={handleChange}
            required
            className={errors.phone ? "error" : ""}
          />
        </div>

        <div className="footer-form__field">
          <div className="field_label">
            <label className="footer-form__label">E-mail*</label>
            {errors.email && (
              <span className="footer-form__error">{errors.email}</span>
            )}
          </div>
          <input
            type="email"
            name="email"
            placeholder="Váš e-mail"
            value={formData.email}
            onChange={handleChange}
            required
            className={errors.email ? "error" : ""}
          />
        </div>

        <div className="footer-form__field">
          <label className="footer-form__label">Zpráva</label>
          <textarea
            name="message"
            placeholder="Jak vám můžeme pomoci?"
            value={formData.message}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className="footer-form__field">
          <label className="footer-form__label">O jaký byt máte zájem?</label>
          <div className="footer-form__apartment-buttons">
            {(["1+KK", "2+KK", "3+KK", "4+KK"] as const).map((type) => (
              <button
                key={type}
                type="button"
                className={`apartment-btn ${
                  formData.apartmentType === type ? "active" : ""
                }`}
                onClick={() => handleApartmentSelect(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="footer-form__checkboxes">
          <label className="footer-form__checkbox-label">
            <span className="custom-checkbox">
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
              />
              <span className="checkmark" />
            </span>
            Chci být součástí newsletteru Daramis a získávat všechny novinky a
            informace.
          </label>

          <label className="footer-form__checkbox-label">
            <span className="custom-checkbox">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
              />
              <span className="checkmark" />
            </span>
            <span>
              Odesláním formuláře souhlasíte se zpracováním{" "}
              <u>zásad ochrany osobních údajů</u>.
            </span>
            {errors.consent && (
              <span className="footer-form__error">{errors.consent}</span>
            )}
          </label>
        </div>
        <div className="submit_wrap">
          <SubmitButton
            text={
              loading
                ? "ODESÍLÁM..."
                : isSubmitted
                  ? "DĚKUJEME ZA ODESLÁNÍ FORMULÁŘE!"
                  : "ODESLAT"
            }
            disabled={loading ? true : false}
            bg={isSubmitted ? "#363A2B" : "#e2b162"}
            color={isSubmitted ? "#ffff" : "#000"}
          />
          {serverError && (
            <span className="footer-form__error">{serverError}</span>
          )}
          {Object.keys(errors).length > 0 && (
            <span className="footer-form__error">
              NĚCO SE POKAZILO. <br /> ZKUSTE TO PROSIM ZNOVU.
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default FooterForm;
