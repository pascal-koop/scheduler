/* eslint-disable no-console */
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { apiBaseUrl, apiToken } = useRuntimeConfig();
  const path = `/items/appointments`;
  try {
    const response = await $fetch<any>(path, {
      baseURL: apiBaseUrl,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
      body: {
        start_time: body.startTime,
        end_time: body.endTime,
        name: body.name,
        company: body.company,
        telephone: body.telephone,
        email: body.email,
        comment: body.comment,
        consent_data_processing: body.consentedDataProcessing,
        campaign_url: body.refererUrl,
        campaign: body.introId,
      },
    });

    return response;
  } catch (error) {
    console.log('error: ', error);
  }
});
