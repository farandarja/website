import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";
import { TikTokIcon } from "@/components/icons/tiktok-icon";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function SocialBar() {
  const socialLinks = [
    { name: "Instagram", icon: <Instagram className="h-6 w-6" />, href: "https://instagram.com/sirkuswaterplay" },
    { name: "TikTok", icon: <TikTokIcon className="h-6 w-6" />, href: "https://www.tiktok.com/@sirkuswaterplayjatiasih?_r=1&_t=ZS-93h0vWDXcUk" },
    { name: "WhatsApp", icon: <MessageCircle className="h-6 w-6" />, href: "https://wa.me/08176988578" },
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
      <div className="flex flex-col space-y-2">
        {socialLinks.map((social, index) => (
          <Link
            key={social.name}
            href={social.href}
            aria-label={social.name}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "default", size: "icon" }),
              "rounded-r-none rounded-l-lg shadow-lg w-12 h-12",
              "bg-primary/90 backdrop-blur-sm hover:bg-primary"
            )}
            style={{transitionDelay: `${index * 100}ms`}}
          >
            {social.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}
