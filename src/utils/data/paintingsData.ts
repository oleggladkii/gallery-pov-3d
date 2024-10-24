import painting1 from "@/assets/images/paintings/painting1.jpeg";
import painting2 from "@/assets/images/paintings/painting2.jpeg";
import painting3 from "@/assets/images/paintings/painting3.jpeg";
import painting4 from "@/assets/images/paintings/painting4.jpeg";
import painting5 from "@/assets/images/paintings/painting5.jpeg";
import painting6 from "@/assets/images/paintings/painting6.jpeg";
import painting7 from "@/assets/images/paintings/painting7.jpeg";
import painting8 from "@/assets/images/paintings/painting8.jpeg";
import painting9 from "@/assets/images/paintings/painting9.jpg";
import painting10 from "@/assets/images/paintings/painting10.jpg";
import type { Painting } from "@/interfaces/entities/Painting";
import { config } from "@/utils/data/config";

export const paintingsData: Painting[] = [
  {
    path: painting1,
    width: 12,
    height: 7.32,
    position: { x: -12, y: 6, z: -(config.floorHeight / 2) + 1.1 },
    rotateY: 0,
    info: {
      name: "Starry Night (1889)",
      author: "Vincent van Gogh",
      price: "$117.2m",
      description:
        'Is one of Vincent van Gogh’s most iconic works, painted in 1889 while he was staying at a mental asylum in Saint-Rémy-de-Provence. The painting depicts a swirling night sky filled with vibrant stars above a quiet village, with a cypress tree extending into the heavens. Van Gogh’s use of bold, expressive brushstrokes and intense color conveys a sense of emotional turbulence and awe for nature’s power. The painting is celebrated for its dynamic composition, where the swirling sky contrasts with the stillness of the landscape below. "Starry Night" has become a symbol of van Gogh’s emotional struggles, as well as his profound connection to the beauty and mystery of the natural world. It is considered one of the masterpieces of Post-Impressionism.',
    },
  },
  {
    path: painting2,
    width: 8,
    height: 8,
    position: { x: 2, y: 6, z: -(config.floorHeight / 2) + 1.1 },
    rotateY: 0,
    info: {
      name: "Mona Lisa (1503)",
      author: "Leonardo da Vinci",
      price: "$970m",
      description:
        'Is perhaps the most famous painting in the world, created by the Italian Renaissance master Leonardo da Vinci between 1503 and 1506. The portrait depicts a woman, believed to be Lisa Gherardini, with a mysterious smile and an enigmatic expression. The painting is renowned for its exquisite detail, soft sfumato technique, and the subtle gradation of light and shadow that creates a sense of depth and realism. The background shows a distant, dreamlike landscape that contrasts with the calm and poised figure. The "Mona Lisa" is celebrated for the psychological complexity of its subject, its compositional harmony, and Leonardo’s innovative techniques that marked a significant advancement in portrait painting.',
    },
  },
  {
    path: painting3,
    width: 12,
    height: 8.16,
    position: { x: 16, y: 6, z: -(config.floorHeight / 2) + 1.1 },
    rotateY: 0,
    info: {
      name: "The Wedding at Cana (1562)",
      author: "Paolo Veronese",
      price: "$100m",
      description:
        "Is a monumental painting by the Venetian Renaissance artist Paolo Veronese, completed in 1562. It depicts the biblical story of Christ’s first miracle, turning water into wine at a wedding feast in Cana. The scene is set within a grand, Venetian-style banquet, filled with lavishly dressed guests, musicians, and servants, blending religious narrative with the opulence of contemporary life in 16th-century Venice. The painting is known for its vibrant colors, detailed figures, and dynamic composition, with over 130 figures spread across the enormous canvas. Veronese’s use of architectural elements and rich textures demonstrates his mastery of perspective and luxurious detailing, making this work a masterpiece of Renaissance art.",
    },
  },
  {
    path: painting4,
    width: 12,
    height: 7.5,
    position: { x: 32, y: 6, z: -(config.floorHeight / 2) + 1.1 },
    rotateY: 0,
    info: {
      name: "The Coronation of Napoleon (1807)",
      author: "Jacques-Louis David",
      price: "$150m",
      description:
        "Also known as Le Sacre de Napoléon, was commissioned by Napoleon Bonaparte and painted by Jacques-Louis David in 1807. The painting depicts the lavish coronation ceremony that took place on December 2, 1804, in the Notre-Dame Cathedral in Paris. In the scene, Napoleon is shown crowning his wife, Josephine, in a gesture that underscores his authority and the establishment of his empire. David meticulously captures the grand setting, the rich costumes, and the prominent figures in attendance. The painting exemplifies the neoclassical style, with its emphasis on clarity, grandeur, and historical significance. It also serves as a propagandistic image, glorifying Napoleon's power and self-made rise to emperor.",
    },
  },
  {
    path: painting5,
    width: 12,
    height: 9.3,
    position: { x: -12, y: 6, z: config.floorHeight / 2 - 1.1 },
    rotateY: Math.PI,
    info: {
      name: "The Apotheosis of Homer (1827)",
      author: "Ingres",
      price: "$250m",
      description:
        "Is a neoclassical painting by French artist Jean-Auguste-Dominique Ingres, completed in 1827. The grand composition depicts the ancient Greek poet Homer being elevated to divine status (apotheosis). Homer is seated in the center, holding a scepter and a scroll, symbolizing his role as the father of Western literature. Surrounding him are numerous figures from history, literature, and the arts, including Virgil, Dante, and Shakespeare, representing the influence of Homer’s work. Ingres’ precise lines, balanced composition, and idealized figures reflect the neoclassical style’s emphasis on classical tradition, order, and harmony. This painting celebrates intellectual achievement and the timeless impact of Homer’s epics, the Iliad and the Odyssey.",
    },
  },
  {
    path: painting6,
    width: 12,
    height: 9.22,
    position: { x: 4, y: 6, z: config.floorHeight / 2 - 1.1 },
    rotateY: Math.PI,
    info: {
      name: "The Fortune Teller (1594)",
      author: "Caravaggio",
      price: "$350m",
      description:
        "Is a genre painting by the Italian Baroque artist Michelangelo Merisi da Caravaggio. It portrays a seemingly simple, everyday scene in which a young man, dressed in fine clothing, is having his fortune told by a young gypsy woman. The woman appears to read his palm while subtly stealing his ring, creating an intriguing moment of deception. Caravaggio masterfully uses light and shadow to highlight the figures and create a sense of intimacy and realism. The painting is notable for its naturalism and psychological depth, capturing both the innocence of the young man and the cunning of the fortune teller. This work is one of Caravaggio’s early masterpieces, showcasing his talent for depicting human emotions and his departure from idealized Renaissance imagery toward a more direct, lifelike representation of everyday people. The Fortune Teller exemplifies Caravaggio’s revolutionary style, blending realism with a dramatic narrative, and it had a significant influence on Baroque art and artists of his time.",
    },
  },
  {
    path: painting7,
    width: 12,
    height: 8.55,
    position: { x: 20, y: 6, z: config.floorHeight / 2 - 1.1 },
    rotateY: Math.PI,
    info: {
      name: "Et in Arcadia ego (1665)",
      author: "Nicolas Poussin",
      price: "$120m",
      description:
        'Is a famous painting by the French Baroque artist Nicolas Poussin. The title, which translates to "Even in Arcadia, I am present," is often interpreted as a reminder of the inevitability of death, even in the most idyllic or idealized settings. The painting depicts a group of shepherds in the mythical land of Arcadia, a symbol of pastoral paradise, examining a tomb inscribed with the titular phrase. Poussin’s composition is calm and balanced, with the shepherds and a woman (thought to represent either a muse or the embodiment of death) contemplatively studying the tombstone. The landscape around them is serene, filled with classical harmony, reflecting Poussin’s interest in antiquity and philosophy. The phrase and painting suggest a meditation on mortality, reminding the viewer that death is an inescapable part of life, even in the most beautiful and peaceful places. "Et in Arcadia ego" is a profound work that combines classical ideals with Baroque emotional depth, making it one of Poussin’s most significant contributions to Western art.',
    },
  },
  {
    path: painting8,
    width: 12,
    height: 7.87,
    position: { x: 36, y: 6, z: config.floorHeight / 2 - 1.1 },
    rotateY: Math.PI,
    info: {
      name: "The Embarkation for Cythera (1717)",
      author: "Jean-Antoine Watteau",
      price: "$550m",
      description:
        "A masterpiece by the French Rococo artist Jean-Antoine Watteau. The painting portrays a group of elegantly dressed aristocrats preparing to depart (or perhaps having arrived) on the mythical island of Cythera, the fabled birthplace of Venus, the goddess of love. The scene is filled with a delicate, romantic atmosphere, capturing the fleeting nature of love, beauty, and pleasure, central themes of the Rococo style. Watteau's use of soft, pastel colors and graceful figures creates an idyllic and dreamlike mood. The painting is often seen as a celebration of romance and leisure, typical of the period, yet it also carries a sense of melancholy, as the figures seem to be bidding farewell to the island, suggesting the transience of love and happiness. \"The Embarkation for Cythera\" is considered one of Watteau's finest works and a defining example of Rococo art.",
    },
  },
  {
    path: painting9,
    width: 12,
    height: 5.34,
    position: { x: -28, y: 6, z: config.floorHeight / 2 - 1.1 },
    rotateY: Math.PI,
    info: {
      name: "Guernica (1937)",
      author: "Pablo Picasso",
      price: "$200m",
      description:
        "One of Pablo Picasso's most famous and powerful works, created in response to the bombing of the Spanish town of Guernica during the Spanish Civil War. The large-scale, monochromatic painting portrays the horrors of war, especially the suffering of civilians. Picasso used distorted and fragmented figures to convey chaos and anguish, including a screaming woman holding her dead child, a dismembered soldier, a terrified horse, and a bull — all traditional symbols in his work.",
    },
  },
  {
    path: painting10,
    width: 12,
    height: 9.01,
    position: { x: -28, y: 6, z: -(config.floorHeight / 2) + 1.1 },
    rotateY: 0,
    info: {
      name: "The Persistence of Memory (1931)",
      author: "Salvador Dalí",
      price: "$1500m",
      description:
        "One of Salvador Dalí's most iconic surrealist paintings. It depicts a dream-like scene featuring melting clocks draped over various objects, symbolizing the fluidity and distortion of time. Set against a barren landscape with distant mountains, the soft, drooping clocks suggest that time is not rigid or absolute but subjective and easily influenced by external forces like memory or perception. The eerie, distorted forms, combined with the stark and desolate environment, evoke themes of decay, impermanence, and the subconscious. Dalí's painting has become a defining symbol of the surrealist movement.",
    },
  },
];
