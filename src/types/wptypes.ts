export type WPPost = {
  id: number;
  date: Date;
  date_gmt: Date;
  guid: {
    rendered: string;
  };
  modified: Date;
  modified_gmt: Date;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: {
    hide_page_title: string;
    _coblocks_attr: string;
    _coblocks_dimensions: string;
    _coblocks_responsive_height: string;
    _coblocks_accordion_ie_support: string;
  };
  categories: [number];
  tags: [string];
  _links: {
    self: [object];
    collection: [object];
    about: [object];
    author: [object];
    replies: [object];
    "version-history": [object];
    "wp:featuredmedia": [object];
    "wp:attachment": [object];
    "wp:term": [object];
    curies: [object];
  };
  media_link: "string";
};

type MediaSizesType = {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
};

export type WPMedia = {
  id: number;
  date: Date;
  date_gmt: Date;
  guid: {
    rendered: string;
  };
  modified: Date;
  modified_gmt: Date;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: {
    hide_page_title: string;
    _coblocks_attr: string;
    _coblocks_dimensions: string;
    _coblocks_responsive_height: string;
    _coblocks_accordion_ie_support: string;
  };
  description: {
    rendered: string;
  };
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: {
      medium: MediaSizesType;
      large: MediaSizesType;
      thumbnail: MediaSizesType;
      medium_large: MediaSizesType;
      full: MediaSizesType;
    };
    image_meta: {
      aperture: string;
      credit: string;
      camera: string;
      caption: string;
      created_timestamp: string;
      copyright: string;
      focal_length: string;
      iso: string;
      shutter_speed: string;
      title: string;
      orientation: string;
      keywords: [string];
    };
    post: null;
    source_url: string;
    _links: {
      self: [object];
      collection: [object];
      about: [object];
      author: [object];
      replies: [object];
    };
  };
};

export type WPUserType = {
  user_nicename?: string;
  user_email?: string;
  user_display_name?: string;
}

export type WPPage = {
  id: number;
  date: Date;
  date_gmt: Date;
  guid: {
    rendered: string;
  };
  modified: Date;
  modified_gmt: Date;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: Array<string>
  _links: {
    self: [object];
    collection: [object];
    about: [object];
    author: [object];
    replies: [object];
    "version-history": [object];
    "wp:featuredmedia": [object];
    "wp:attachment": [object];
    curies: [object];
  }
}