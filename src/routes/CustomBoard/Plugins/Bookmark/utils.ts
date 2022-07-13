import {
  BookIcon,
  BookmarkIcon,
  ComputerIcon,
  ConnectIcon,
  EmailIcon,
  FoodIcon,
  GameIcon,
  GraphIcon,
  MovieIcon,
  PeopleIcon,
  StarIcon,
} from 'assets/svgs/icons';
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

export const iconIds = [
  'google',
  'youtube',
  'naver',
  'facebook',
  'instagram',
  'netflix',
  'github',
  'wanted',
  'sof',
  'book',
  'bookmark',
  'computer',
  'connect',
  'email',
  'food',
  'game',
  'graph',
  'movie',
  'people',
  'star',
];

export const bookmarkPreset = [
  { name: 'Google', url: 'https://www.google.co.kr/', icon: 'google' },
  { name: 'Youtube', url: 'https://www.youtube.com/', icon: 'youtube' },
  { name: 'instagram', url: 'https://www.instagram.com/', icon: 'instagram' },
  { name: 'Netflix', url: 'https://www.netflix.com/kr/', icon: 'netflix' },
  { name: 'Naver', url: 'https://www.naver.com/', icon: 'naver' },
  { name: 'Facebook', url: 'https://facebook.com/', icon: 'facebook' },
  { name: 'Github', url: 'https://github.com/', icon: 'github' },
  { name: 'Wanted', url: 'https://www.wanted.co.kr/', icon: 'wanted' },
  { name: 'Stack-Overflow', url: 'https://stackoverflow.com/', icon: 'sof' },
];

export const getBookmarkIcon = (id: string) => {
  let bookmarkIcon;
  bookmarkIcon = {
    google: GoogleIcon,
    youtube: YoutubeIcon,
    naver: NaverIcon,
    facebook: FacebookIcon,
    instagram: InstagramIcon,
    netflix: NetflixIcon,
    github: GitHubIcon,
    wanted: WantedIcon,
    sof: StackOverflowIcon,
    book: BookIcon,
    bookmark: BookmarkIcon,
    computer: ComputerIcon,
    connect: ConnectIcon,
    email: EmailIcon,
    food: FoodIcon,
    game: GameIcon,
    graph: GraphIcon,
    movie: MovieIcon,
    people: PeopleIcon,
    star: StarIcon,
  }[id];

  if (!bookmarkIcon) bookmarkIcon = StarIcon;

  return bookmarkIcon;
};
