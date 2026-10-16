/* Your content lives here. The site renders these lists on the Home,
   Portfolio and About pages. While a list is empty, the page shows a dashed
   placeholder slot. Add an entry and the slot is replaced automatically.

   work: one object per project.
     {
       client:   "Client name",
       scope:    ["Social media", "Paid ads", "Websites", "Site management"],  // any of these
       period:   "Mar to Sep 2025",
       spend:    "$18,000",              // ad spend managed, or "n/a" for web-only work
       result:   "Cost per lead down 41%",
       baseline: "From $62 to $37 per lead, measured in the client's CRM",
       summary:  "What the problem was and what you did, in two or three sentences.",
       url:      "https://client-site.com"   // optional
     }

   testimonials: one object per quote. Get written permission first.
     {
       quote:   "Exact words from the client.",
       name:    "Full name",
       role:    "Job title",
       company: "Company",
       photo:   "assets/people/name.jpg",   // optional
       url:     "https://..."               // optional link to a review or the client's site
     }

   team: one object per person.
     {
       name:  "Full name",
       role:  "Role",
       photo: "assets/people/name.jpg",
       bio:   "One or two sentences."
     }
*/
window.SITE_CONTENT = {
  work: [],
  testimonials: [],
  team: []
};
