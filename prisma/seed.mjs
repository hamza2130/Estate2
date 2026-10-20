import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const img = (id) => `https://images.unsplash.com/photo-${id}?w=1400&q=70&auto=format&fit=crop`;

const IMAGES = {
  villa1: img("1613490493576-7fde63acd811"),
  villa2: img("1600596542815-ffad4c1539a9"),
  house1: img("1600585154340-be6161a56a0c"),
  house2: img("1512917774080-9991f1c4c750"),
  house3: img("1564013799919-ab600027ffc6"),
  house4: img("1570129477492-45c003edd2be"),
  house5: img("1568605114967-8130f3a36994"),
  house6: img("1580587771525-78b9dba3b914"),
  interior1: img("1600607687939-ce8a6c25118c"),
  interior2: img("1600566753190-17f0baa2a6c3"),
  interior3: img("1502672260266-1c1ef2d93688"),
  apartment: img("1560448204-e02f11c3d0e2"),
  commercial1: img("1486406146926-c627a92ad1ab"),
  commercial2: img("1497366216548-37526070297c"),
  land1: img("1500382017468-9049fed747ef"),
  land2: img("1449844908441-8829872d2607"),
};

const projects = [
  {
    slug: "dha-phase-5-islamabad",
    name: "DHA Phase 5 Islamabad",
    location: "GT Road, Islamabad",
    tagline: "Developed sectors, possession-ready plots and a growing community",
    description:
      "One of the most active phases of DHA Islamabad-Rawalpindi, with developed sectors, wide boulevards and quick access to GT Road and Islamabad Expressway. A good fit for families who want to build soon and investors who want liquidity.",
    image: IMAGES.house1,
    highlights: ["Possession and non-possession plots", "Direct GT Road access", "Commercial hubs and parks", "Strong resale demand"],
    sortOrder: 1,
  },
  {
    slug: "dha-phase-6-islamabad",
    name: "DHA Phase 6 Islamabad",
    location: "Islamabad Expressway",
    tagline: "Value buys in a phase still on its growth curve",
    description:
      "DHA Phase 6 offers lower entry prices than the established phases, with development ongoing across sectors. It suits longer-horizon investors and buyers planning to build over the next few years.",
    image: IMAGES.land1,
    highlights: ["Lower entry prices", "Ongoing development", "Planned commercial avenues", "Good long-term upside"],
    sortOrder: 2,
  },
  {
    slug: "dha-margalla-orchard",
    name: "DHA Margalla Orchard",
    location: "Islamabad",
    tagline: "Green, gated living near the Margalla foothills",
    description:
      "A boutique DHA community with landscaped streets and a quieter, greener setting. Popular with families looking for a peaceful neighbourhood within reach of the city.",
    image: IMAGES.land2,
    highlights: ["Gated and secured", "Landscaped streets", "Family-oriented community", "Close to Islamabad city"],
    sortOrder: 3,
  },
  {
    slug: "bahria-town-villas",
    name: "Bahria Town Villas",
    location: "Bahria Town, Islamabad",
    tagline: "Ready-to-move villas with full community amenities",
    description:
      "Constructed villas in Bahria Town with schools, mosques, hospitals and commercial areas on your doorstep. Ideal for buyers who want to move in without going through construction.",
    image: IMAGES.villa1,
    highlights: ["Ready to move in", "Complete community amenities", "Secure gated living", "Easy rental demand"],
    sortOrder: 4,
  },
];

const properties = [
  { title: "1 Kanal Possession Plot, Sector A", project: "dha-phase-5-islamabad", type: "Plot", price: 42500000, areaValue: 1, areaUnit: "Kanal", location: "Sector A, DHA Phase 5", featured: true, images: [IMAGES.land1, IMAGES.land2], features: ["Possession paid", "Corner option available", "Near park", "Developed street"] },
  { title: "10 Marla Plot on Main Boulevard", project: "dha-phase-5-islamabad", type: "Plot", price: 21000000, areaValue: 10, areaUnit: "Marla", location: "Sector E, DHA Phase 5", featured: true, images: [IMAGES.land2, IMAGES.land1], features: ["Boulevard facing", "All dues clear", "Ready for construction"] },
  { title: "Designer 1 Kanal House with Basement", project: "dha-phase-5-islamabad", type: "House", price: 135000000, areaValue: 1, areaUnit: "Kanal", beds: 6, baths: 7, location: "Sector B, DHA Phase 5", featured: true, images: [IMAGES.house2, IMAGES.interior1, IMAGES.interior2], features: ["Full basement with home theatre", "Imported kitchen", "Solar system", "Servant quarter", "Double garage"] },
  { title: "Brand New 10 Marla House", project: "dha-phase-5-islamabad", type: "House", price: 72000000, areaValue: 10, areaUnit: "Marla", beds: 5, baths: 6, location: "Sector F, DHA Phase 5", images: [IMAGES.house3, IMAGES.interior3], features: ["Brand new construction", "Modern elevation", "Near mosque and park"] },
  { title: "8 Marla Commercial Plot, Business District", project: "dha-phase-5-islamabad", type: "Commercial", price: 95000000, areaValue: 8, areaUnit: "Marla", location: "Commercial Zone, DHA Phase 5", featured: true, images: [IMAGES.commercial1], features: ["High footfall location", "Ground + 7 floors allowed", "Ideal for plaza or bank"] },
  { title: "1 Kanal Plot, Sector 1", project: "dha-phase-6-islamabad", type: "Plot", price: 19500000, areaValue: 1, areaUnit: "Kanal", location: "Sector 1, DHA Phase 6", featured: true, images: [IMAGES.land1], features: ["Prime location", "Balloted file", "Investment opportunity"] },
  { title: "10 Marla Plot near Park", project: "dha-phase-6-islamabad", type: "Plot", price: 10500000, areaValue: 10, areaUnit: "Marla", location: "Sector 3, DHA Phase 6", images: [IMAGES.land2], features: ["Park facing", "Level land", "Clear title"] },
  { title: "5 Marla Commercial, Main Avenue", project: "dha-phase-6-islamabad", type: "Commercial", price: 38000000, areaValue: 5, areaUnit: "Marla", location: "Main Avenue, DHA Phase 6", images: [IMAGES.commercial2], features: ["Main avenue frontage", "Mixed use allowed"] },
  { title: "Farmhouse-style 2 Kanal Plot", project: "dha-margalla-orchard", type: "Plot", price: 48000000, areaValue: 2, areaUnit: "Kanal", location: "Block C, DHA Margalla Orchard", featured: true, images: [IMAGES.land2, IMAGES.land1], features: ["Hill view", "Gated block", "Ready for construction"] },
  { title: "1 Kanal Modern House, Hill View", project: "dha-margalla-orchard", type: "House", price: 98000000, areaValue: 1, areaUnit: "Kanal", beds: 5, baths: 6, location: "Block A, DHA Margalla Orchard", images: [IMAGES.house6, IMAGES.interior2], features: ["Margalla hills view", "Landscaped lawn", "Smart home wiring"] },
  { title: "Luxury Villa, Overseas Block", project: "bahria-town-villas", type: "Villa", price: 58000000, areaValue: 10, areaUnit: "Marla", beds: 4, baths: 5, location: "Overseas Block, Bahria Town", featured: true, images: [IMAGES.villa1, IMAGES.interior1], features: ["Ready to move", "Fully furnished option", "Community pool access"] },
  { title: "Corner Villa with Lawn", project: "bahria-town-villas", type: "Villa", price: 46500000, areaValue: 8, areaUnit: "Marla", beds: 4, baths: 4, location: "Sector D, Bahria Town", images: [IMAGES.villa2, IMAGES.interior3], features: ["Corner plot", "Front lawn", "Near commercial area"] },
  { title: "Furnished 2 Bed Apartment for Rent", project: "bahria-town-villas", type: "Apartment", purpose: "Rent", price: 145000, areaValue: 1150, areaUnit: "Sq. Ft.", beds: 2, baths: 2, location: "Civic Center, Bahria Town", images: [IMAGES.apartment, IMAGES.interior3], features: ["Fully furnished", "Lift and backup power", "Secure parking"] },
  { title: "10 Marla Upper Portion for Rent", project: "dha-phase-5-islamabad", type: "House", purpose: "Rent", price: 120000, areaValue: 10, areaUnit: "Marla", beds: 3, baths: 3, location: "Sector C, DHA Phase 5", images: [IMAGES.house5], features: ["Separate entrance", "Family preferred", "Gas and electricity separate"] },
  { title: "Office Floor in Corporate Tower", type: "Commercial", purpose: "Rent", price: 650000, areaValue: 4200, areaUnit: "Sq. Ft.", location: "Blue Area, Islamabad", images: [IMAGES.commercial2, IMAGES.commercial1], features: ["Open plan floor", "Central air conditioning", "Dedicated parking"] },
  { title: "7 Marla House, Sold Recently", project: "bahria-town-villas", type: "House", status: "Sold", price: 32000000, areaValue: 7, areaUnit: "Marla", beds: 3, baths: 4, location: "Phase 8, Bahria Town", images: [IMAGES.house4], features: ["Recently renovated", "Near school"] },
];

const guides = [
  {
    slug: "dha-phase-5-vs-phase-6",
    title: "DHA Phase 5 vs Phase 6 Islamabad: Which to Buy",
    category: "Buying Guide",
    coverImage: IMAGES.house1,
    excerpt: "Both phases have a place in a smart portfolio. Here is how to choose based on budget, timeline and whether you plan to build.",
    content: `Choosing between DHA Phase 5 and Phase 6 usually comes down to three things: your budget, how soon you want to build, and how long you plan to hold.

## When Phase 5 makes sense
- You want to start construction soon on a developed street
- You value resale liquidity and a settled community
- You are comfortable paying more per marla for certainty

## When Phase 6 makes sense
- You want a lower entry price
- You have a longer investment horizon
- You are fine waiting for development to complete

## Our advice
Prices vary by sector and change over time, so always confirm current rates, dues and development status with DHA and an advisor before you commit. We share a sector-by-sector comparison with every client before a site visit.`,
  },
  {
    slug: "how-we-verify-a-dha-file",
    title: "How We Verify a DHA File Before You Pay",
    category: "Legal & Transfer",
    coverImage: IMAGES.interior1,
    excerpt: "Our title check covers ownership, dues, ballot status and physical location, so there are no surprises on transfer day.",
    content: `Every file we list goes through the same checklist before it appears on our website.

## The checklist
- Ownership confirmed against the seller's original documents
- Outstanding dues and development charges checked
- Ballot and possession status confirmed
- Plot location visited and photographed on site

## Why it matters
Most problems in property deals come from details nobody checked early. Doing this work up front protects both buyer and seller and keeps the transfer on schedule.`,
  },
  {
    slug: "property-transfer-process-islamabad",
    title: "The Property Transfer Process, Step by Step",
    category: "Legal & Transfer",
    coverImage: IMAGES.commercial1,
    excerpt: "From token money to the final transfer letter, here is what happens and what you need at each stage.",
    content: `A transfer is straightforward when every document is ready before you arrive.

## The steps
- Agree the price and pay token money against a signed receipt
- Prepare documents: CNICs, photographs, original file and NDC
- Biometric verification of buyer and seller
- Pay transfer fees and taxes
- Receive the transfer letter in the buyer's name

## How we help
Our team prepares the paperwork, books the appointment and accompanies you on the day, so the process takes as few visits as possible.`,
  },
];

const testimonials = [
  { name: "Ahmed R.", role: "Overseas buyer, Dubai", quote: "I bought a plot in DHA Phase 5 without flying in. The video site visit and title report gave me complete confidence.", rating: 5 },
  { name: "Sana K.", role: "Homeowner, Bahria Town", quote: "They found us a ready villa within our budget and handled the whole transfer. Honest advice from start to finish.", rating: 5 },
  { name: "Usman T.", role: "Investor, Islamabad", quote: "Clear sector-by-sector comparisons and no pressure. They are my first call for any DHA deal now.", rating: 5 },
];

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

async function main() {
  const email = (process.env.ADMIN_EMAIL || "admin@autostack.ai").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "admin123";
  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash: await bcrypt.hash(password, 10) },
    create: { email, name: "Admin", passwordHash: await bcrypt.hash(password, 10) },
  });

  if ((await prisma.project.count()) > 0) {
    console.log("Content already seeded; admin user updated.");
    return;
  }

  const projectIds = {};
  for (const p of projects) {
    const row = await prisma.project.create({ data: { ...p, highlights: JSON.stringify(p.highlights) } });
    projectIds[p.slug] = row.id;
  }
  for (const [i, p] of properties.entries()) {
    const { project, images, features, ...rest } = p;
    await prisma.property.create({
      data: {
        ...rest,
        slug: slugify(p.title),
        description:
          rest.description ||
          `${p.title} in ${p.location}. Title-checked by our team with all documents available for review. Contact us to book a guided site visit or a live video walkthrough.`,
        images: JSON.stringify(images),
        features: JSON.stringify(features),
        projectId: project ? projectIds[project] : null,
        createdAt: new Date(Date.now() - i * 86_400_000),
      },
    });
  }
  for (const g of guides) await prisma.guide.create({ data: g });
  for (const t of testimonials) await prisma.testimonial.create({ data: t });
  console.log(`Seeded ${projects.length} projects, ${properties.length} properties, ${guides.length} guides.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
