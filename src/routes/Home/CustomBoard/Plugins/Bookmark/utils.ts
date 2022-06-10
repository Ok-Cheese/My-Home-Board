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
