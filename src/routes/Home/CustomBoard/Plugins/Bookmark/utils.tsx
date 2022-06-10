import {
  FacebookIcon,
  GitHubIcon,
  GoogleIcon,
  InstagramIcon,
  NaverIcon,
  NetflixIcon,
  StackOverflowIcon,
  WantedIcon,
  YoutubeIcon,
} from 'assets/svgs/presets';

export const iconIds = ['google', 'youtube', 'github', 'instagram', 'netflix', 'wanted', 'sof'];

export const getBookmarkIcon = (iconId: string) => {
  return {
    google: <GoogleIcon />,
    youtube: <YoutubeIcon />,
    github: <GitHubIcon />,
    instagram: <InstagramIcon />,
    netflix: <NetflixIcon />,
    wanted: <WantedIcon />,
    sof: <StackOverflowIcon />,
    naver: <NaverIcon />,
    facebook: <FacebookIcon />,
  }[iconId];
};
