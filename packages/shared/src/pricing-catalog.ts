/* Pricing catalog for the "Build your scope" estimator.
   EDIT YOUR PRICES HERE (AED). mo = monthly, qty = quantity stepper, inc = included free with these option ids,
   quote = price on request, from = starting price. The website and the API both read this file, and the API
   recalculates every total itself, so a visitor cannot send a different price. */
import type { PricingCatalog } from './types';

export const PRICING: PricingCatalog = {
  currency: 'AED',
  usdPeg: 3.6725,
  deposit: 0.5,
  terms: [
    {
      "id": "1",
      "label": "Monthly",
      "discount": 0
    },
    {
      "id": "3",
      "label": "3 months",
      "discount": 0.05
    },
    {
      "id": "6",
      "label": "6 months",
      "discount": 0.1
    }
  ],
  sections: [
    {
      "k": "id",
      "no": "01",
      "t": "Logo &amp; <em>branding</em>",
      "sub": "Pick one. Every brand identity includes the logo.",
      "radio": true,
      "items": [
        {
          "id": "logo1",
          "n": "Logo essentials",
          "p": 1500,
          "d": "2 concepts · 2 revision rounds · primary logo and icon · colour and mono files (AI, PDF, SVG, PNG)"
        },
        {
          "id": "logo2",
          "n": "Signature logo",
          "p": 3000,
          "d": "3 concepts · 3 revision rounds · full logo suite: primary, secondary, icon, wordmark · colours and typefaces · usage sheet"
        },
        {
          "id": "ar1",
          "n": "Arabic logotype + style guide",
          "p": 3500,
          "d": "Custom Arabic lettering, drawn by hand and then vectorised · 2 directions · 3 revision rounds · style guide: clear space, minimum size, colours, matching typeface, do's and don'ts",
          "tag": "New"
        },
        {
          "id": "ar2",
          "n": "Arabic + English logotype + style guide",
          "p": 6000,
          "d": "Arabic lettering with a matching English logotype, designed as one pair · horizontal and stacked lock-ups · 3 revision rounds · full style guide: colour, type system, lock-ups, misuse and mock-ups"
        },
        {
          "id": "az",
          "n": "Brand identity A to Z",
          "p": 9500,
          "d": "Brand strategy · logo suite · colour and type system · patterns · brand guidelines book · stationery · social media templates · 3 revision rounds",
          "tag": "Most chosen"
        },
        {
          "id": "lux",
          "n": "Luxury brand A to Z",
          "p": 18000,
          "d": "Everything in A to Z, plus positioning workshop · bilingual mark with custom Arabic lettering · luxury brand voice · premium print and packaging direction · launch kit · 5 revision rounds"
        }
      ],
      "add": [
        {
          "id": "gl",
          "n": "Brand guidelines book",
          "p": 2500,
          "d": "The full brand rulebook as a PDF book: logo use, colour, type, pattern, tone and applications. Goes beyond the logo style guide",
          "inc": [
            "az",
            "lux"
          ]
        },
        {
          "id": "name",
          "n": "Naming &amp; tagline",
          "p": 2500,
          "d": "A shortlist of names and tagline routes, with the reasoning and a trademark-search checklist"
        },
        {
          "id": "pack",
          "n": "Packaging design",
          "p": 1200,
          "d": "Per product (SKU), press-ready with dielines",
          "qty": {
            "lab": "How many products?",
            "max": 30
          }
        },
        {
          "id": "stat",
          "n": "Stationery &amp; print set",
          "p": 900,
          "d": "Business card, letterhead, envelope, email signature",
          "inc": [
            "az",
            "lux"
          ]
        }
      ]
    },
    {
      "k": "voice",
      "no": "02",
      "t": "Brand <em>voice</em>",
      "sub": "How the brand speaks, in English and Arabic.",
      "radio": true,
      "items": [
        {
          "id": "v1",
          "n": "Brand voice essentials",
          "p": 2000,
          "d": "Tone of voice · 3 messaging pillars · bio, about and tagline",
          "inc": [
            "lux"
          ]
        },
        {
          "id": "v2",
          "n": "Luxury brand voice",
          "p": 4000,
          "d": "Positioning story · tone of voice guide · messaging pillars · 3 tagline routes · signature vocabulary · bilingual EN / AR copy samples",
          "inc": [
            "lux"
          ]
        }
      ]
    },
    {
      "k": "web",
      "no": "03",
      "t": "Website <em>A to Z</em>",
      "sub": "Design, build and launch. From AED 4,000 to 12,000.",
      "radio": true,
      "items": [
        {
          "id": "w1",
          "n": "Landing page",
          "p": 4000,
          "d": "One long page · mobile-first · WhatsApp and contact form · basic SEO · 2 revision rounds · launch"
        },
        {
          "id": "w2",
          "n": "Business website",
          "p": 7500,
          "d": "Up to 6 pages · editable CMS · blog or projects · speed and SEO setup · analytics · 3 revision rounds",
          "tag": "Most chosen"
        },
        {
          "id": "w3",
          "n": "Premium website or online store",
          "p": 12000,
          "d": "Up to 12 pages or a store with up to 50 products · online payments · English + Arabic · custom animation · 3 revision rounds"
        }
      ],
      "add": [
        {
          "id": "wp",
          "n": "Extra pages",
          "p": 500,
          "d": "Per page, designed and built",
          "qty": {
            "lab": "How many pages?",
            "max": 30
          }
        },
        {
          "id": "war",
          "n": "Arabic version",
          "p": 1500,
          "d": "Right-to-left layout and Arabic typography across the site",
          "inc": [
            "w3"
          ]
        },
        {
          "id": "wdom",
          "n": "Domain, hosting &amp; email setup",
          "p": 600,
          "d": "Set up and connected for you. The yearly fees are paid at cost"
        },
        {
          "id": "wcare",
          "n": "Website care plan",
          "p": 500,
          "d": "Updates, backups, security and small content changes every month",
          "mo": 1
        }
      ]
    },
    {
      "k": "app",
      "no": "04",
      "t": "App design &amp; <em>build</em>",
      "sub": "iOS and Android. From AED 4,000.",
      "radio": true,
      "items": [
        {
          "id": "a1",
          "n": "App UI / UX design",
          "p": 4000,
          "d": "iOS and Android screens · up to 15 screens · user flow · clickable prototype · developer hand-off"
        },
        {
          "id": "a2",
          "n": "App design + MVP build",
          "p": 18000,
          "d": "One cross-platform app for iOS and Android · up to 10 core screens · login, admin panel · App Store and Google Play publishing",
          "from": 1
        },
        {
          "id": "a3",
          "n": "Custom app",
          "d": "Bookings, payments, marketplaces or integrations. Quoted after a scoping call",
          "quote": 1
        }
      ],
      "add": [
        {
          "id": "as",
          "n": "Extra screens",
          "p": 250,
          "d": "Per screen, iOS and Android",
          "qty": {
            "lab": "How many screens?",
            "max": 60
          }
        },
        {
          "id": "ast",
          "n": "App store listing design",
          "p": 800,
          "d": "Screenshots, icon and preview graphics for both stores"
        }
      ]
    },
    {
      "k": "social",
      "no": "05",
      "t": "Social media <em>monthly</em>",
      "sub": "Managed every month. From AED 3,000.",
      "radio": true,
      "mo": true,
      "term": true,
      "items": [
        {
          "id": "s1",
          "n": "Social media management",
          "p": 3000,
          "d": "One platform · strategy and monthly calendar · 12 posts and stories designed from your content · captions EN / AR · scheduling · replies 5 days a week · monthly report",
          "mo": 1
        },
        {
          "id": "s2",
          "n": "Content package · 15 posts",
          "p": 3500,
          "d": "Content, shooting and design: 1 shoot day a month · 15 designed posts · captions · ready to publish",
          "mo": 1
        },
        {
          "id": "s3",
          "n": "Management + content",
          "p": 6000,
          "d": "Both plans together: we shoot, design, publish and manage. You save AED 500 a month",
          "mo": 1,
          "tag": "Best value"
        }
      ],
      "add": [
        {
          "id": "ig",
          "n": "Instagram build",
          "p": 1200,
          "d": "One-off: profile audit, bio, highlight covers and a 9-post launch grid"
        },
        {
          "id": "li",
          "n": "LinkedIn build &amp; management",
          "p": 1500,
          "d": "Company or personal page set up, then 8 posts a month and engagement",
          "mo": 1
        },
        {
          "id": "yt",
          "n": "YouTube channel",
          "p": 2000,
          "d": "Channel set-up and art, then 2 uploads a month edited, titled and optimised for search",
          "mo": 1
        },
        {
          "id": "ads",
          "n": "Paid ads management",
          "p": 1000,
          "d": "Meta ads set-up, creatives and weekly optimisation. Ad spend is paid directly to the platform",
          "mo": 1
        }
      ]
    },
    {
      "k": "video",
      "no": "06",
      "t": "Video production &amp; <em>editing</em>",
      "sub": "Priced per video. Add as many as you need.",
      "items": [
        {
          "id": "ed",
          "n": "Reel editing",
          "p": 350,
          "d": "Your footage, up to 60 seconds: cut, colour, captions and music",
          "qty": {
            "lab": "How many reels?",
            "max": 50
          }
        },
        {
          "id": "ugc",
          "n": "UGC video",
          "p": 1200,
          "d": "Script, creator, shoot and edit in the authentic phone-shot style. Creator usage rights for 3 months",
          "qty": {
            "lab": "How many videos?",
            "max": 20
          }
        },
        {
          "id": "vsl",
          "n": "VSL · video sales letter",
          "p": 3500,
          "d": "Sales script, presenter or voice-over, motion graphics and edit, up to 5 minutes",
          "qty": {
            "lab": "How many VSLs?",
            "max": 10
          }
        },
        {
          "id": "re",
          "n": "Real estate video",
          "p": 2500,
          "d": "Property or community shoot, cinematic edit, music licence, vertical and horizontal cuts",
          "qty": {
            "lab": "How many properties?",
            "max": 20
          }
        },
        {
          "id": "dr",
          "n": "Drone footage",
          "p": 800,
          "d": "Add aerial shots to a real estate or brand shoot, permits arranged",
          "qty": {
            "lab": "How many shoots?",
            "max": 20
          }
        },
        {
          "id": "film",
          "n": "Brand or launch film",
          "p": 6000,
          "d": "Concept, storyboard, one shoot day, edit, colour and sound design, up to 90 seconds",
          "qty": {
            "lab": "How many films?",
            "max": 5
          }
        }
      ]
    }
  ],
  presets: [
    {
      "label": "Launch a brand",
      "pick": {
        "id": "az",
        "web": "w1",
        "add": [
          "ig"
        ],
        "social": "s1"
      }
    },
    {
      "label": "Luxury launch",
      "pick": {
        "id": "lux",
        "web": "w3",
        "social": "s3",
        "vid": {
          "film": 1
        }
      }
    },
    {
      "label": "Real estate project",
      "pick": {
        "id": "az",
        "web": "w2",
        "vid": {
          "re": 2,
          "dr": 1,
          "ed": 4
        }
      }
    },
    {
      "label": "Grow on social",
      "pick": {
        "social": "s3",
        "add": [
          "ig",
          "ads"
        ]
      }
    }
  ],
};
