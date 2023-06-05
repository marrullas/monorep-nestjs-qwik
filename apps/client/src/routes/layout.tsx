import { component$, Slot, useStyles$ } from '@builder.io/qwik';


import Header from '../components/header/header';
import Footer from '../components/footer/footer';

import styles from './styles.css?inline';
export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <main>
        <Header />
        <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
      </main>
      <Footer />
    </>
  );
});
