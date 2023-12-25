/* eslint-disable no-console */
/*
liefert Objekt mit einer Kampagne aus
wenn keine Kampagne vorhanden return 404 response
-> sendNoContent(event, code = 404)
*/

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { apiBaseUrl, apiToken } = useRuntimeConfig();
  const path = `/items/campaigns?filter[slug][_eq]=${body.slug}`;
  try {
    const { data } = await $fetch<any>(path, {
      baseURL: apiBaseUrl,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    if (data.length === 0) {
      return sendNoContent(event, 404);
    }

    return data[0];
  } catch (error) {
    console.log('error: ', error);
  }
});
