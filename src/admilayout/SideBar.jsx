import React, { useState } from "react";
import {
  Avatar,
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
  Tooltip,
  tooltipClasses,
  Button,
  ListSubheader,
} from "@mui/material";
import {
  Home,
  Settings,
  ExitToApp,
  Inventory2,
  Factory,
  PersonAdd,
  Store,
  ExpandLess,
  ExpandMore,
  Menu,
  Close,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import StorageIcon from "@mui/icons-material/Storage";
import {
  Gift,
  GiftIcon,
  Grid,
  HomeIcon,
  Image,
  IndianRupee,
  Layers,
  ListOrdered,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleResethome = () => {
    navigate("/");
  };
  const handleLogout = () => {
    localStorage.clear();
    // Perform logout logic here, e.g., clearing tokens, redirecting to login page, etc.
    navigate("/admin/login");
  };

  const [openMenu, setOpenMenu] = useState(null);

  const handleToggle = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <HomeIcon  size={18} />,
      path: "/admin",
    },
    {
      title: "Manage Category",
      icon: <Layers  size={18} />,
      path: "/admin/categories",
    },
    {
      title: "Manage Sub Category",
      icon: <Layers  size={18} />,
      path: "/admin/subcategories",
    },
    {
      title: "Manage Product",
      icon: <Package  size={18} />,
      path: "/admin/products",
      hasSubmenu: true,
      submenu: [
        {
          title: "Add Product",
          path: "/admin/products/add",
        },
        {
          title: "Product List",
          path: "/admin/products/list",
        },
      ],
    },
    
    {
      title: "Manage Sub Product",
      icon: <Package  size={18} />,
      path: "/admin/subproducts",
      hasSubmenu: true,
      submenu: [
        {
          title: "Add Sub Product",
          path: "/admin/subproducts/add",
        },
        {
          title: "Sub Product List",
          path: "/admin/subproducts/list",
        },
      ],
    },
    {
      title:"Combo Mange",
      icon:<Package size={18}/>,
      path:"/admin/combo",
      hasSubmenu: true,
      submenu: [
        {
          title: "Add Combo",
          path: "/admin/combo/add",
        },
        {
          title: "Combo List",
          path: "/admin/combo/list",
        },
      ],
      },
    {
      title: "Manage Distributor",
      icon: <Users  size={18} />,
      path: "/admin/distributors",
      hasSubmenu: true,
      submenu: [
        {
          title: "Add Distributor",
          path: "/admin/distributors/add",
        },
        {
          title: "Distributor List",
          path: "/admin/distributors/list",
        },
      ],
    },
    // {
    //   title: "Manage Slider",
    //   icon: <Image  size={18} />,
    //   path: "/admin/sliders",
    // },
    // {
    //   title: "Manage Gallery",
    //   icon: <Grid  size={18} />,
    //   path: "/admin/gallery",
    // },
    {
      title: "Manage User",
      icon: <Users  size={18} />,
      path: "/admin/users",
    },
    {
      title: "Manage Order",
      icon: <ShoppingCart  size={18} />,
      path: "/admin/orders",
    },
    {
      title: "RP Bonus Manage",
      icon: <ShoppingCart  size={18} />,
      path: "/admin/bonus",
    },
    {
      title: "RP Transactions",
      icon: <ShoppingCart  size={18} />,
      path: "/admin/rp/transactions",
    },
    {
      title: "RP Value Exchange",
      icon: <ShoppingCart  size={18} />,
      path: "/admin/rp/exchange",
    },

    {
      title: "Manage Complaint",
      icon: <ShoppingCart  size={18} />,
      path: "/admin/Complaint",
    },
    {
      title: "Manage Banner",
      icon: <ShoppingCart  size={18} />,
      path: "/admin/Banner",
    },
    {
      title: "Manage KYC",
      icon: <ShoppingCart  size={18} />,
      path: "/admin/KYC",
    },
    {
      title: "Income",
      icon: <IndianRupee  size={18} />,
      hasSubmenu: true,
      submenu: [
        {
          title: "Performance Bonus",
          path: "/admin/income/Performance",
        },
        {
          title: "Weekly Matching income",
          path: "/admin/income/weekly",
        },
        {
          title: "Director income",
          path: "/admin/income/director",
        },
        {
          title: "Pearl Director",
          path: "/admin/income/pearl",
        },
        {
          title: "Emerald Director",
          path: "/admin/income/Emerald",
        },
        {
          title: "Diamond Director",
          path: "/admin/income/diamond",
        },
        {
          title: "Double Director",
          path: "/admin/income/double",
        },
      ],
    },
    {
      title: "Manage Gift",
      icon: <Gift  size={18} />,
      path: "/admin/gift",
    },
    {
      title: "Gift Orders",
      icon: <GiftIcon  size={18} />,
      path: "/admin/gift/orders",
    },
    {
      title: "Gift Coupon",
      icon: <GiftIcon  size={18} />,
      path: "/admin/gift/coupon",
    },
    {
      title: "Schemes",
      icon: <Layers  size={18} />,
      hasSubmenu: true,
      submenu: [
        {
          title: "Progressive bonus",
          path: "/admin/scheme/progressive",
        },
        {
          title: "Successive bonus",
          path: "/admin/scheme/successive",
        },
      ],
    },
  ];

  return (
    <div>
      <Box
        className={`flex flex-col py-4 [background:#383a3a] text-white ${
          isSidebarOpen ? "w-[250px]" : "w-[60px]"
        }`}
        style={{ height: "100%" }}
      >
        <div>
          <div className="flex items-center mb-4">
            <Avatar
              className="cursor-pointer left-2"
              onClick={() => navigate("/Profile")}
              alt="User Photo"
              sx={{
                backgroundColor: "transparent",
                width: 56,
                height: 56,
                marginRight: 2,
                display: isSidebarOpen ? "block" : "none",
              }}
            />
            {isSidebarOpen && (
              <div>
                <Typography variant="h6" className="montserrat-text-normal">
                  User Name
                </Typography>
              </div>
            )}
          </div>
          <nav>
            <List>
              {menuItems.map((item, index) => (
                <React.Fragment key={index}>
                  <Tooltip
                  componentsProps={{  
                    tooltip: {  
                      sx: {  
                        bgcolor: '#383a3a', // Custom hex color  
                        color: 'white', 
                        padding:'0px', 
                        borderTopLeftRadius: '0px', // Optional: rounded corners  
                        borderBottomLeftRadius: '0px', // Optional: rounded corners  
                        borderTopRightRadius: '8px', // Optional: rounded corners  
                        borderBottomRightRadius: '8px', // Optional: rounded corners 
                        cursor:'pointer', 
                      },  
                    },  
                  }}  
                    disableHoverListener={isSidebarOpen}
                    placement="right"
                    title={
                      item.hasSubmenu && !isSidebarOpen ? (
                        <List>
                          {item.submenu.map((subItem, subIndex) => (
                            <>
                            <ListItem className="cursor-pointer"  onClick={() => navigate(subItem.path)} key={subIndex}>
                              {subItem.title}
                            </ListItem>
                            </>
                          ))}
                        </List>
                      ) : (
                        <ListItem className="cursor-pointer"  onClick={() => navigate(item.path)} >{item.title}</ListItem>
                        
                      )
                    }
                    slotProps={{
                      popper: {
                        sx: {
                          [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                            {
                              marginTop: "0px",
                            },
                          [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                            {
                              marginBottom: "0px",
                            },
                          [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
                            {
                              marginLeft: "0px",
                            },
                          [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
                            {
                              marginRight: "0px",
                            },
                        },
                      },
                    }}
                  >
                    <ListItem
                      button
                      onClick={() =>
                        item.hasSubmenu
                          ? handleToggle(item.title)
                          : navigate(item.path)
                      }
                      style={{
                        backgroundColor:
                          location.pathname === item.path
                            ? "#FFEDEC"
                            : "inherit",
                        color:
                          location.pathname === item.path ? "black" : "white",
                      }}
                    >
                      <ListItemIcon className="w-8 cursor-pointer" sx={{ color:location.pathname === item.path ? "black" : "white", }}>{item.icon}</ListItemIcon>
                      {isSidebarOpen && (
                        <li className="montserrat-text-normal list-none cursor-pointer">
                          {item.title}
                        </li>
                      )}
                      {item.hasSubmenu &&
                        isSidebarOpen &&
                        (openMenu === item.title ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        ))}
                    </ListItem>
                  </Tooltip>
                  {item.hasSubmenu && (
                    <Collapse in={openMenu === item.title}>
                      <List disablePadding className="pl-6">
                        {item.submenu.map((subItem, subIndex) => (
                          <ListItemButton
                            key={subIndex}
                            onClick={() => navigate(subItem.path)}
                            style={{
                              backgroundColor:
                                location.pathname === subItem.path
                                  ? "#FFEDEC"
                                  : "inherit",
                              color:
                                location.pathname === subItem.path
                                  ? "black"
                                  : "white",
                            }}
                          >
                            <ListItemIcon>{subItem.icon}</ListItemIcon>
                            {isSidebarOpen && (
                              <li className="montserrat-text-normal list-none">
                                {subItem.title}
                              </li>
                            )}
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              ))}
            </List>
          </nav>
        </div>
        <div>
          <nav>
            <List>
              <Tooltip
                title="Logout"
                placement="right"
                disableHoverListener={isSidebarOpen}
                componentsProps={{
                  tooltip:{
                    sx:{
                      bgcolor: '#383a3a',
                      color: 'white',
                      // padding: '0px',
                      borderTopLeftRadius: '0px',
                      borderBottomLeftRadius: '0px',
                      borderTopRightRadius: '8px',
                      borderBottomRightRadius: '8px',
                    }
                  }
                }}
                slotProps={{
                  popper: {
                    sx: {
                      [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                        {
                          marginTop: "0px",
                        },
                      [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                        {
                          marginBottom: "0px",
                        },
                      [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
                        {
                          marginLeft: "0px",
                        },
                      [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
                        {
                          marginRight: "0px",
                        },
                    },
                  },
                }}
              >
                <ListItem onClick={handleLogout} button className="cursor-pointer">
                  <ListItemIcon>
                    <ExitToApp className="text-white" />
                  </ListItemIcon>
                  {isSidebarOpen && (
                    <li className="montserrat-text-normal list-none">Logout</li>
                  )}
                </ListItem>
              </Tooltip>
            </List>
          </nav>
        </div>
      </Box>
    </div>
  );
};

export default Sidebar;
