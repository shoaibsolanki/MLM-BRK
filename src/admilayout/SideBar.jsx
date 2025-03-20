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

  const [openMenu, setOpenMenu] = useState(null);

  const handleToggle = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <HomeIcon  size={18} />,
      path: "/admin/dashboard",
    },
    {
      title: "Manage Category",
      icon: <Layers  size={18} />,
      path: "/categories",
    },
    {
      title: "Manage Sub Category",
      icon: <Layers  size={18} />,
      path: "/subcategories",
    },
    {
      title: "Manage Product",
      icon: <Package  size={18} />,
      path: "/products",
      hasSubmenu: true,
      submenu: [
        {
          title: "Add Product",
          path: "/products/add",
        },
        {
          title: "Product List",
          path: "/products/list",
        },
      ],
    },
    {
      title: "Manage Sub Product",
      icon: <Package  size={18} />,
      path: "/subproducts",
      hasSubmenu: true,
      submenu: [
        {
          title: "Add Sub Product",
          path: "/subproducts/add",
        },
        {
          title: "Sub Product List",
          path: "/subproducts/list",
        },
      ],
    },
    {
      title: "Manage Distributor",
      icon: <Users  size={18} />,
      path: "/distributors",
      hasSubmenu: true,
      submenu: [
        {
          title: "Add Distributor",
          path: "/distributors/add",
        },
        {
          title: "Distributor List",
          path: "/distributors/list",
        },
      ],
    },
    {
      title: "Manage Slider",
      icon: <Image  size={18} />,
      path: "/sliders",
    },
    {
      title: "Manage Gallery",
      icon: <Grid  size={18} />,
      path: "/gallery",
    },
    {
      title: "Manage User",
      icon: <Users  size={18} />,
      path: "/users",
    },
    {
      title: "Manage Order",
      icon: <ShoppingCart  size={18} />,
      path: "/orders",
    },
    {
      title: "Manage Complaint",
      icon: <ShoppingCart  size={18} />,
      path: "/Complaint",
    },
    {
      title: "Manage Banner",
      icon: <ShoppingCart  size={18} />,
      path: "/Banner",
    },
    {
      title: "Manage KYC",
      icon: <ShoppingCart  size={18} />,
      path: "/KYC",
    },
    {
      title: "Income",
      icon: <IndianRupee  size={18} />,
      hasSubmenu: true,
      submenu: [
        {
          title: "Performance Bonus",
          path: "/income/Performance",
        },
        {
          title: "Weekly Matching income",
          path: "/income/weekly",
        },
        {
          title: "Director income",
          path: "/income/director",
        },
        {
          title: "Pearl Director",
          path: "/income/pearl",
        },
        {
          title: "Emerald Director",
          path: "/income/Emerald",
        },
        {
          title: "Diamond Director",
          path: "/income/diamond",
        },
        {
          title: "Double Director",
          path: "/income/double",
        },
      ],
    },
    {
      title: "Manage Gift",
      icon: <Gift  size={18} />,
      path: "/gift",
    },
    {
      title: "Gift Orders",
      icon: <GiftIcon  size={18} />,
      path: "/gift/orders",
    },
    {
      title: "Gift Coupon",
      icon: <GiftIcon  size={18} />,
      path: "/gift/coupon",
    },
    {
      title: "Schemes",
      icon: <Layers  size={18} />,
      hasSubmenu: true,
      submenu: [
        {
          title: "Progressive bonus",
          path: "/scheme/progressive",
        },
        {
          title: "Successive bonus",
          path: "/scheme/successive",
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
                            <ListItem  onClick={() => navigate(subItem.path)} key={subIndex}>
                              {subItem.title}
                            </ListItem>
                            </>
                          ))}
                        </List>
                      ) : (
                        <ListItem  onClick={() => navigate(item.path)} >{item.title}</ListItem>
                        
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
                      <ListItemIcon className="w-8" sx={{ color:location.pathname === item.path ? "black" : "white", }}>{item.icon}</ListItemIcon>
                      {isSidebarOpen && (
                        <li className="montserrat-text-normal list-none">
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
        <div className="mt-auto" style={{ marginBottom: "200px" }}>
          <nav>
            <List>
              <Tooltip
                title="Logout"
                placement="right"
                disableHoverListener={isSidebarOpen}
              >
                <ListItem button className="cursor-pointer">
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
