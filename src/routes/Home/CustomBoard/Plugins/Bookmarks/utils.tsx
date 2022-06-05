import {
  GitHubIcon,
  GoogleIcon,
  InstagramIcon,
  NetflixIcon,
  StackOverflowIcon,
  WantedIcon,
  YoutubeIcon,
} from 'assets/svgs';

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
  }[iconId];
};
