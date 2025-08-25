import { AuthRedirectWrapper } from '@/wrappers';
import { HeroComponent, HowToConnectComponent } from './components';

// prettier-ignore
const styles = {
  homeContainer: 'home-container flex flex-col items-center justify-center gap-10 bg-transparent px-2 pb-10 max-w-320 w-screen rounded-3xl overflow-hidden'
} satisfies Record<string, string>;

export default function Home() {
  return (
    <AuthRedirectWrapper requireAuth={false}>
      <div className={styles.homeContainer}>
        <HeroComponent />

        <HowToConnectComponent />
      </div>
    </AuthRedirectWrapper>
  );
}
