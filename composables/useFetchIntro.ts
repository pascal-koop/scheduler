export const useFetchIntro = async () => {
  const route = useRoute();
  const slug = route.params.slug || 'default';

  const { data, status } = await useFetch('/api/intro', {
    method: 'POST',
    body: {
      slug,
    },
  });

  if (status.value === 'error') {
    return {};
  }

  return data;
};
