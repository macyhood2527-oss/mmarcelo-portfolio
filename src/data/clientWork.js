// src/data/clientWork.js

export const clientWork = {
  sectionTitle: "Client Experience",
  kicker: "Client-proven work",
  intro:
    "Previously worked with a digital agency (later transitioned to direct client engagement) for ~1 year, producing structured campaign assets and content executions.",

  engagements: [
    {
      id: "agency-to-direct",
      title: "Content & Campaign Execution",
      role: "Social Media Manager",
      timeframe: "~1 year",
      engagementType: "Agency → Direct client",
      summary:
        "Produced educational carousel campaigns and short-form video edits with an emphasis on clear narrative flow, visual consistency, and audience-first messaging.",
      tools: ["Canva", "Content planning", "Video editing workflow"],
      highlights: [
        "Planned and produced multi-slide educational carousels",
        "Edited short-form campaign video content",
        "Collaborated with stakeholders to align content with brand objectives",
      ],
      media: {
        carousels: [
          {
            id: "carousel-1",
            title: "Carousel Sample 1",
            embedUrl:
              "https://www.canva.com/design/DAGplrhI2kM/a5HIkdyhYZx_HrUM90blew/view?embed",
            viewUrl:
              "https://www.canva.com/design/DAGplrhI2kM/a5HIkdyhYZx_HrUM90blew/view",
          },
          {
            id: "carousel-2",
            title: "Carousel Sample 2",
            embedUrl:
              "https://www.canva.com/design/DAGplugTHs8/O3XHa4ndj5lxgcbTcfjA9Q/view?embed",
            viewUrl:
              "https://www.canva.com/design/DAGplugTHs8/O3XHa4ndj5lxgcbTcfjA9Q/view",
          },
          {
            id: "carousel-3",
            title: "Carousel Sample 3",
            embedUrl:
              "https://www.canva.com/design/DAGplqr41GA/FcSxJik2reeW92XiEIhL_A/view?embed",
            viewUrl:
              "https://www.canva.com/design/DAGplqr41GA/FcSxJik2reeW92XiEIhL_A/view",
          },
        ],
        videos: [
          {
            id: "video-1",
            title: "Campaign Video Edit (Client)",
            url: "https://youtu.be/xic_X8OdaMU",
            platform: "YouTube",
          },
        ],
       testimonial: {
  title: "Client Testimonial",
  url: "https://youtu.be/05Ys0Afkr2c",
  ratio: "9:16", // keep as portrait feel (if it’s actually portrait)
  note: "Short client feedback on the work and results.",
}

        
      },
    },
  ],
};