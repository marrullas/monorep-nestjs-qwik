import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';


export const useGetRouteData = routeLoader$(async () => {
  const response = await fetch("http://localhost:3000/api/");
  const data = await response.json();
  console.log(data);
  return data;
});

export const getRequest = async() => {
  const response = await fetch("/api");
  const data = await response.json();
  console.log(data);
  return data;
}

export default component$(() => {
  return (
    <>
      <span class="text-5xl">Hola Magola</span>
      <button onClick$={() =>getRequest()

      }>Click me</button>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
