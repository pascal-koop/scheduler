/* eslint-disable no-console */
export const useSubmitAppointment = async (
  startTime: Date | null,
  endTime: Date | null,
  name: string | null,
  company: string | null,
  telephone: string | null,
  email: string | null,
  comment: string | null,
  consentedDataProcessing: boolean | null,
  refererUrl: string | null,
  introId: string | null
) => {
  const { status } = await useFetch('/api/appointment', {
    method: 'POST',
    body: {
      startTime,
      endTime,
      name,
      company,
      telephone,
      email,
      comment,
      consentedDataProcessing,
      refererUrl,
      introId,
    },
  });

  if (status.value === 'error') {
    console.log(status.value);
  }
  return status.value;
};
