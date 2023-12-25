<script setup lang="ts">
onMounted(() => {
  if (process.client) {
    contactInput.value.refererUrl = window.location.href;
  }
  calenderOf14Days.value = useCalenderIntervalGenerator(new Date());
  timeSlots.value = useTimeSlotGenerator();
});
const props = defineProps(['introId']);

interface ContactFormInput {
  selectedDate: Date | null;
  selectedTime: Date | null;
  name: string | null;
  company: string | null;
  telephone: string | null;
  email: string | null;
  comment: string | null;
  consentedDataProcess: boolean | null;
  refererUrl: string | null;
  introId: string | null;
}

const contactInput = ref<ContactFormInput>({
  selectedDate: null,
  selectedTime: null,
  name: null,
  company: null,
  telephone: null,
  email: null,
  comment: null,
  consentedDataProcess: null,
  refererUrl: null,
  introId: props.introId,
});

const fetchStatus = ref('');
const calenderOf14Days: any = ref([]);
const currentDate = ref(new Date());
const timeSlots: any = ref([]);
const showLoadingSpinner = ref(false);
const showButton = ref(true);

const timeSlotSelected = (timeSlot: Date) => {
  contactInput.value.selectedTime = timeSlot;
};

const dateSelected = (date: Date) => {
  contactInput.value.selectedDate = date;
};

const nextTwoWeeks = () => {
  calenderOf14Days.value = [];
  currentDate.value.setDate(currentDate.value.getDate() + 14);
  calenderOf14Days.value = useCalenderIntervalGenerator(currentDate.value, 14);
};

const previousTwoWeeks = () => {
  calenderOf14Days.value = [];
  currentDate.value.setDate(currentDate.value.getDate() - 14);

  if (currentDate.value < new Date()) {
    currentDate.value = new Date();
  }

  calenderOf14Days.value = useCalenderIntervalGenerator(currentDate.value, 14);
};

const transformSelectedTimeIntoStartAndEndTime = (selectedTime: Date | null, selectedDate: Date | null) => {
  if (selectedTime === null || selectedDate === null) {
    return { startTime: null, endTime: null };
  }

  const startTime = new Date(selectedDate);
  startTime.setHours(selectedTime.getHours());
  startTime.setMinutes(0);
  startTime.setSeconds(0);

  const endTime = new Date(startTime);
  endTime.setHours(endTime.getHours() + 1);

  return { startTime, endTime };
};

const sendContactInput = async (input: ContactFormInput) => {
  const { startTime, endTime } = transformSelectedTimeIntoStartAndEndTime(
    contactInput.value.selectedTime,
    contactInput.value.selectedDate
  );
  fetchStatus.value = '';
  showLoadingSpinner.value = true;
  fetchStatus.value = await useSubmitAppointment(
    startTime,
    endTime,
    input.name,
    input.company,
    input.telephone,
    input.email,
    input.comment,
    input.consentedDataProcess,
    input.refererUrl,
    input.introId
  );
  if (fetchStatus.value === 'success') {
    showButton.value = false;
  } else {
    showLoadingSpinner.value = false;
  }
};

const requiredFieldsEmpty = computed(() => {
  if (
    contactInput.value.selectedDate === null ||
    contactInput.value.selectedTime === null ||
    contactInput.value.name === '' ||
    contactInput.value.email === '' ||
    contactInput.value.consentedDataProcess === false ||
    contactInput.value.consentedDataProcess === null
  ) {
    return true;
  } else {
    return false;
  }
});

const emailNotValid = computed(() => {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (
    contactInput.value.email === null ||
    contactInput.value.email === '' ||
    !pattern.test(contactInput.value.email.toString())
  ) {
    return true;
  } else {
    return false;
  }
});

const formHasErrors = computed(() => {
  return requiredFieldsEmpty.value ||
    emailNotValid.value ||
    contactInput.value.name === null ||
    contactInput.value.name.length < 2
    ? true
    : false;
});

const showAppointmentFetchingSuccess = computed(() => fetchStatus.value === 'success');

const showAppointmentFetchingError = computed(() => fetchStatus.value === 'error');
</script>

<template>
  <main>
    <DatePicker
      :dates="calenderOf14Days"
      :selected-date="contactInput.selectedDate"
      @date-selected="dateSelected"
      @previous-two-weeks="previousTwoWeeks"
      @next-two-weeks="nextTwoWeeks"
    />
    <Transition name="slide-fade">
      <TimeSlots
        v-if="contactInput.selectedDate"
        :time-slots="timeSlots"
        :selected-time-slot="contactInput.selectedTime"
        @time-slot-selected="timeSlotSelected"
      />
    </Transition>
    <Transition name="slide-fade">
      <PersonalInformation
        v-if="contactInput.selectedTime"
        v-model:name="contactInput.name"
        v-model:company="contactInput.company"
        v-model:telephone="contactInput.telephone"
        v-model:email="contactInput.email"
        v-model:comment="contactInput.comment"
        v-model:consented-data-process="contactInput.consentedDataProcess"
        :required-fields-empty="requiredFieldsEmpty"
        :email-not-valid="emailNotValid"
      />
    </Transition>
    <Transition name="slide-fade">
      <div class="send-button" v-if="contactInput.selectedTime">
        <button
          v-if="showButton"
          class="send-button-content"
          :class="{ 'user-has-send-form': showLoadingSpinner }"
          @click="sendContactInput(contactInput)"
          :disabled="formHasErrors"
        >
          <span class="button-title">Terminanfrage senden</span>
          <svg
            v-show="showLoadingSpinner"
            role="status"
            class="send-button-loading-spinner h-6 w-6 animate-spin fill-gray-300 text-gray-100"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            ></path>
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            ></path>
          </svg>
        </button>
        <p class="fetch-error-msg" v-if="showAppointmentFetchingError">
          Leider gab es einen Fehler. Bitte versuchen Sie es später nochmal.
        </p>
      </div>
    </Transition>
    <div v-if="showAppointmentFetchingSuccess" class="fetch-success-messages">
      <p class="fetch-success-msg-1">Vielen Dank für Ihre Anfrage.</p>
      <p class="fetch-success-msg-2">Wir melden uns bei Ihnen.</p>
    </div>
  </main>
</template>
