export const products = [
  {
    id: 'fools-sceptres',
    name: "The Fool's Sceptres",
    subtitle: 'Dual Fire Staves — 90cm',
    price: 250,
    priceDisplay: '£250',
    images: [
      '/emporium/fools-sceptres-1.jpg',
      '/emporium/fools-sceptres-2.jpg',
    ],
    shortDescription: 'Throw them. Spin them. Be ridiculous. Be brilliant.',
    description: `These staves want play. They want to be airborne, caught behind your back, isolated and taken on a journey with a clown who loves fire. The Fool doesn't perform precision — the Fool performs aliveness.

Hand braided leather diamond wrap, black and bone, grade 6082 aluminium. Leather collar joints, solid wood dowels. 100% pure kevlar wicks. Every detail made by hand, built to take the chaos.

You cannot buy a leather-wrapped fire staff anywhere else. These exist once. They will not be made again. No copies allowed. These staves are a part of the limited selection.

For the clowns who know that strength and play are the same thing.

My guarantee is that the wrap will outlast the kevlar.`,
    details: [
      'Grade 6082 aluminium shafts',
      '100% pure kevlar wicks',
      'Hand-braided leather diamond wrap',
      'Leather collar joints',
      'Solid wood dowels',
      '90cm length',
      'One of a kind — will not be remade',
      'Limited edition series',
    ],
    category: 'fire',
    inStock: true,
  },
  {
    id: 'alchemists-key',
    name: "The Alchemist's Key",
    subtitle: 'Hand-Stitched Leather Herb Pouch',
    price: 50,
    priceDisplay: '£50',
    images: [
      '/emporium/alchemists-key-1.jpg',
      '/emporium/alchemists-key-2.jpg',
    ],
    shortDescription: 'One sigil. One key. Infinite doors.',
    description: `A companion for consciousness explorers, this pouch is made with intent. The key sigil worked into its face is not ornament — it is purpose made visible. Plant based substances have been humanity's oldest companions in the work of self-exploration. Like the key, they open the door but only you can decide to walk through.

Cut from recycled leather, raw-edged, enchanted. Unique and never to be made again. A smoker's companion. A sorcerer's tool.

This has been used as my personal pouch and has been kept in excellent condition.`,
    details: [
      'Hand-stitched recycled leather',
      'Raw natural edges',
      'Key sigil hand-worked into the face',
      'Layered construction',
      'Fits a 50g tobacco pouch',
      'One of a kind',
      'Pre-loved',
    ],
    callToAction: 'You have the key. What do you want to open?',
    category: 'leather',
    inStock: true,
  },
  {
    id: 'triquetra-talisman',
    name: 'Triquetra Talisman',
    subtitle: 'Hand-Stitched Leather Sigil',
    price: 80,
    priceDisplay: '£80',
    images: [
      '/emporium/triquetra-1.jpg',
      '/emporium/triquetra-2.jpg',
    ],
    shortDescription: 'Three dimensions. One path.',
    description: `The triquetra is ancient. Appearing carved into Celtic stonework thousands of years old. Three interlocking arcs, each passing over and under the others, forming a trinity that has no beginning and no end. A reflection of the great mystery. The meaning of this symbol is for you to see. Allow your mind to be still and observe this sigil to reveal its secrets.

Hand-stitched in thick cord onto teal-dyed leather, set into a black ground, finished with a braided hanging loop. Made to be placed somewhere it will catch your eye daily — above a doorway, on a wall, at the centre of an altar.

This is sigil magic in its most honest form. You are not being asked to believe anything. You are simply placing a symbol to create an anchor to direct your awareness to the great mystery. You know what this symbol means, this talisman is an anchor, revealing the layers between you and that understanding.

Hang it in a place of importance where you can contemplate it fully.`,
    details: [
      'Teal-dyed leather inset',
      'Emerald colour stitch',
      'Hand-stitched triquetra in thick cord',
      'Braided hanging loop',
      'Enchanted sigil magic',
      'One of a kind',
    ],
    category: 'leather',
    inStock: true,
  },
];

export function getProductById(id) {
  return products.find((p) => p.id === id) || null;
}
