import './App.css';
import { faInfo, faLock } from '@fortawesome/free-solid-svg-icons';
import { BigButtons, BigNavButton } from './BigNavButtons';

export function HomePage() {
  return (
    <>
      <h1>Lockup Helper</h1>
      <h2>WIP - Do Not Use Yet</h2>
      <p>
        This website can help you to set a customizable combination lock to a
        random number that you don't know, but the computer will know. This can
        be useful for self-keyholding chastity or self-bondage sessions when
        paired with something like{' '}
        <a href="https://www.emlalock.com/">Emlalock</a> or{' '}
        <a href="https://chaster.app/">Chaster</a>.
      </p>
      <BigButtons>
        <BigNavButton title="Learn more" icon={faInfo} to="/info">
          Learn more about this site
        </BigNavButton>
        <BigNavButton title="Do a lockup" icon={faLock} to="/lockup">
          Use the site to set the combination on your lock
        </BigNavButton>
      </BigButtons>
      <p className="read-the-docs">
        Built with &lt;3 by sqrt10pi. All code is available at{' '}
        <a href="https://github.com/sqrt10pi/lockup-ui">GitHub</a> under the MIT
        license.
      </p>
    </>
  );
}
