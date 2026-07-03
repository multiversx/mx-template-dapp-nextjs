import { HeroComponent } from '../HeroComponent';
import { HowToConnectComponent } from '../HowToConnectComponent';

// prettier-ignore
const styles = {
  homeContainer: 'home-container flex flex-col items-center justify-center gap-10 bg-transparent px-2 pb-10 max-w-320 w-screen rounded-3xl overflow-hidden'
} satisfies Record<string, string>;

export const HomeView = () => (
  <div className={styles.homeContainer}>
    <HeroComponent />

    <HowToConnectComponent />
  </div>
);
