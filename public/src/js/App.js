var data = {
  common: {
    hotlineNumber: '+848.7300.7998'
  },
  languages: {
    vn: {
      appAdsImg: 'http://i.imgur.com/RbkZmt3.jpg',
      eventTitleHot: 'http://i.imgur.com/wi2LgRD.png',
      eventTitleNew: 'http://i.imgur.com/AUVqCIQ.png',
      eventTitleOther: 'http://i.imgur.com/OeVOMKG.png',
      eventTitleCategory: 'http://i.imgur.com/7KMI6tf.png',
      cateEntertainment: 'GIẢI TRÍ',
      cateLearning: 'HỌC HỎI',
      cateEverythingElse: 'CÁC LĨNH VỰC KHÁC',
      cateBrowseAll: 'Xem tất cả sự kiện',
      developBy: 'Phát triển và quản lý bởi Công ty TNHH Keewi. 85/18A Phạm Viết Chánh, P. 19, Q. Bình Thạnh | Tp. HCM. Email: support@ticketbox.vn. Hotline: +848.7300.7998',
      footerContent: 'Bản tin hàng tuần được gửi đến bạn để thông báo về những sự kiện nổi bật trên <a href="https://ticketbox.vn/events" target="_blank" style="font-weight: bold;color:#333; text-decoration: none">Ticketbox.vn</a>. Nhấn vào <a href="[unsubscribe]" style="font-weight: bold; color:#333; text-decoration: none" target="_blank">Unsubscribe</a> nếu bạn không muốn tiếp tục nhận tin'
    },
    en: {
      appAdsImg: 'http://i.imgur.com/qSFFqdL.jpg',
      eventTitleHot: 'http://i.imgur.com/bO8QTM2.png',
      eventTitleNew: 'http://i.imgur.com/gfOVHdj.png',
      eventTitleOther: 'http://i.imgur.com/SE80xss.png',
      eventTitleCategory: 'http://i.imgur.com/VCIQJeH.png',
      cateEntertainment: 'ENTERTAINMENT',
      cateLearning: 'LEARNING',
      cateEverythingElse: 'EVERYTHING ELSE',
      cateBrowseAll: 'DISCOVER ALL EVENTS',
      developBy: 'Developed and managed by Keewi co., ltd. Address: 85/18A Pham Viet Chanh Street, Ward 19, Binh Thanh District, Ho Chi Minh City. Email: support@ticketbox.vn. Hotline: +848.7300.7998',
      footerContent: 'We send weekly email newsletters to notify our customers about upcoming great events to attend on <a href="https://ticketbox.vn/events" target="_blank" style="font-weight: bold;color:#333; text-decoration: none">Ticketbox.vn</a>. Click <a href="[unsubscribe]" style="font-weight: bold; color:#333; text-decoration: none" target="_blank">Unsubscribe</a> if you no longer wish to receive these emails.'
    }
  }
};

React.render(React.createElement(Newsletter, {data: data}), document.getElementById('app'));