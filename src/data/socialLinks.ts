import {
  GithubIcon,
  DiscordIcon,
  RedditIcon,
  YoutubeIcon,
  BuyMeACoffeeIcon,
} from "../components/ui/SocialIcons";

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/PocketMC/pocket-mc-windows",
    icon: GithubIcon,
    hoverColor: "hover:text-accent hover:border-accent/40",
    textHoverColor: "hover:text-accent",
  },
  {
    name: "Discord",
    url: "https://discord.gg/h27uNCaxPH",
    icon: DiscordIcon,
    hoverColor: "hover:text-[#5865F2] hover:border-[#5865F2]/40",
    textHoverColor: "hover:text-[#5865F2]",
  },
  {
    name: "Reddit",
    url: "https://www.reddit.com/r/PocketMC/",
    icon: RedditIcon,
    hoverColor: "hover:text-[#FF4500] hover:border-[#FF4500]/40",
    textHoverColor: "hover:text-[#FF4500]",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@OfficialPocketMC",
    icon: YoutubeIcon,
    hoverColor: "hover:text-[#FF0000] hover:border-[#FF0000]/40",
    textHoverColor: "hover:text-[#FF0000]",
  },
  {
    name: "Buy Me a Coffee",
    url: "https://www.buymeacoffee.com/sahaj33",
    icon: BuyMeACoffeeIcon,
    hoverColor: "hover:text-[#FFDD00] hover:border-[#FFDD00]/40",
    textHoverColor: "hover:text-[#FFDD00]",
  },
];
