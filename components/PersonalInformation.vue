<script setup>
onMounted(() => {
  useScrollToElement(target.value);
});

const target = ref(null);

defineEmits([
  'update:name',
  'update:email',
  'update:company',
  'update:telephone',
  'update:comment',
  'update:consentedDataProcess',
  'sendContactInput',
]);

const props = defineProps([
  'name',
  'email',
  'company',
  'telephone',
  'comment',
  'consentedDataProcess',
  'requiredFieldsEmpty',
  'emailNotValid',
]);

const showEmailValidationError = computed(() => {
  if (props.email === '' || props.email === null) return false;
  return props.emailNotValid ? true : false;
});
</script>

<style></style>

<template>
  <div ref="target" class="personal-information-form">
    <div class="personal-information-form-inner">
      <h2 class="personal-information-title">Ihre Kontaktdaten</h2>
      <div class="input-name">
        <label class="personal-information-label" for="name"> Name<span class="input-required">*</span> </label>
        <input
          class="personal-information-input"
          type="text"
          id="name"
          :value="name"
          @input="$emit('update:name', $event.target.value)"
          required
        />
      </div>
      <div class="input-email">
        <label class="personal-information-label" for="email"> E-Mail<span class="input-required">*</span> </label>
        <input
          class="personal-information-input"
          type="email"
          id="email"
          :value="email"
          @input="$emit('update:email', $event.target.value)"
          required
        />
        <span class="email-error-msg" v-if="showEmailValidationError">
          Bitte gebe eine valide E-mail-Adresse ein!
        </span>
      </div>
      <div class="input-company">
        <label class="personal-information-label" for="company"> Unternehmen </label>
        <input
          class="personal-information-input"
          type="text"
          id="company"
          :value="company"
          @input="$emit('update:company', $event.target.value)"
        />
      </div>
      <div class="input-telephone">
        <label class="personal-information-label" for="telephone"> Telefon </label>
        <input
          class="personal-information-input"
          type="tel"
          id="telephone"
          :value="telephone"
          @input="$emit('update:telephone', $event.target.value)"
        />
      </div>
      <div class="input-comment">
        <label class="personal-information-label" for="comment"> Kommentar </label>
        <textarea
          class="input-comment-textarea"
          id="comment"
          :value="comment"
          @input="$emit('update:comment', $event.target.value)"
        />
      </div>
      <div class="data-processing-checkbox">
        <input
          class="personal-information-input"
          type="checkbox"
          :value="consentedDataProcess"
          @click="$emit('update:consentedDataProcess', $event.target.checked)"
          id="data-processing"
          required
        />
        <div class="outer-data-processing-svg">
          <svg class="inner-data-processing-svg" version="1.1" viewBox="0 0 17 12" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
              <g transform="translate(-9 -11)" fill="#009dd9" fill-rule="nonzero">
                <path
                  d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z"
                />
              </g>
            </g>
          </svg>
        </div>
        <label for="data-processing">
          <p class="data-processing-content">
            Ich stimme zu, dass meine Angaben aus dem Formular erhoben und verarbeitet werden.<span
              class="input-required"
              >*</span
            >
          </p>
        </label>
      </div>
      <div class="data-processing-information">
        <p class="data-processing-information-content">
          Weitere Informationen zum Umgang mit Nutzerdaten finden Sie in unserer
          <a
            class="data-processing-information-content-link"
            href="https://www.example.com/de/datenschutzerklaerung/"
            target="_blank"
          >
            Datenschutzerklärung
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
