const menus = [
  {
    label: "Dashbaord",
    link: "/admin/dashboard",
  },
  {
    label: "E-commerce",
    children: [
      {
        label: "All Products",
        link: "/admin/all-products",
      },
      {
        label: "New Product",
        link: "/admin/new-product",
      },
      {
        label: "Attribute",
        link: "/admin/attribute",
      },
    ],
  },
  {
    label: "Media ",
    children: [
      {
        label: "All Media",
        link: "/admin/all-media",
      },
      {
        label: "New Media",
        link: "/admin/new-media",
      },
    ],
  },
  {
    label: "Users",
    children: [
      {
        label: "All User",
        link: "/admin/all-users",
      },
      {
        label: "New User",
        link: "/admin/new-users",
      },
      {
        label: "New User",
        link: "/admin/new-user",
      },
    ],
  },
];

export default menus;
