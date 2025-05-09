import React, { useState } from "react";
import {
  Avatar,
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import {
  ExitToApp,
  ExpandLess,
  ExpandMore,
  PostAdd,
  SupportAgent,
  
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Layers,
  Package,
  Users,
  ShoppingCart,
  Image,
  GalleryVertical,
  User,
  IndianRupee,
  Gift,
  ShieldCheck,
  BadgePercent,
  Repeat,
  Wallet,
 
} from "lucide-react";
import StraightenIcon from '@mui/icons-material/Straighten';
import { useAuth } from "../contexts/AuthConext";
const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const userData = JSON.parse(localStorage.getItem("user_data"))
  const {userType} = userData || {}
   const { permission, isLoding, role } = useAuth();
  const checkPermission = (index, page) => {
    console.log(index , page)
     return (
       userType === "ADMIN" ||
       (( userType == "subadmin" ) &&
       permission[index]?.name === page &&
       permission[index]?.status === true )
     );
   };
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
      icon: <Home size={20} />,
      path: "/admin",
      isPermission : checkPermission(0 ,"Dashboard")
    },
    {
      title: "Manage Category",
      icon: <Layers size={20} />,
      path: "/admin/categories",
      isPermission : checkPermission(1 ,"Category")
    },
    {
      title: "Manage Sub Category",
      icon: <Layers size={20} />,
      path: "/admin/subcategories",
      isPermission : checkPermission(1,"Category")
    },
    {
      title: "Manage Product",
      icon: <Package size={20} />,
      path: "/admin/products",
      isPermission : checkPermission(2 ,"Product"),
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
      icon: <Package size={20} />,
      path: "/admin/combo",
      isPermission : checkPermission(2 ,"Product"),
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
      title: "Gallery",
      icon: <GalleryVertical size={20} />,
      path: "/admin/AllGallery",
      isPermission : checkPermission(3 ,"Gallery"),
    },
    
    {
      title: "Manage Distributor",
      icon: <Users size={20} />,
      path: "/admin/distributors",
      isPermission : checkPermission(4 ,"Distributor"),
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
    {
      title: "Manage User",
      icon: <User size={20} />,
      path: "/admin/users",
      isPermission : checkPermission(5 ,"User"),
    },
    {
      title: "Manage Order",
      icon: <ShoppingCart size={20} />,
      path: "/admin/orders",
      isPermission : checkPermission(6 ,"Order"),
    },
    {
      title: "RP Bonus Manage",
      icon: <BadgePercent size={20} />,
      path: "/admin/bonus",
      isPermission : checkPermission(7,"Bonus"),
    },
    {
      title: "Payout",
      icon: <Repeat size={20} />,
      path: "/admin/rp/transactions",
      isPermission : checkPermission(8 ,"RpTransactions"),
    },
    {
      title: "RP Value Exchange",
      icon: <IndianRupee size={20} />,
      path: "/admin/rp/exchange",
      isPermission : checkPermission(9 ,"RpExchange"),
    },
    {
      title: "Manage Complaint",
      icon: <ShieldCheck size={20} />,
      path: "/admin/Complaint",
      isPermission : checkPermission(10 ,"Complaint"),
    },
    {
      title: "Manage Slider",
      icon: <Image size={20} />,
      path: "/admin/slider",
      isPermission : checkPermission(11 ,"Slider"),
    },
    {
      title: "Manage KYC",
      icon: <ShieldCheck size={20} />,
      path: "/admin/KYC",
      isPermission : checkPermission(12 ,"KYC"),
    },
    {
      title: "Income",
      icon: <IndianRupee size={20} />,
      hasSubmenu: true,
      isPermission : checkPermission(13 ,"Income"),
      submenu: [
        {
          title: "Beginner",
          path: "/admin/income/Beginner",
        },
        {
          title: "Starter",
          path: "/admin/income/Starter",
        },
        {
          title: "Opener income",
          path: "/admin/income/Opener",
        },
        {
          title: "Runner Director",
          path: "/admin/income/Runner",
        },
        {
          title: "Winner Director",
          path: "/admin/income/Winner",
        },
        {
          title: "Star Director",
          path: "/admin/income/Star",
        },
        // {
        //   title: "Double Director",
        //   path: "/admin/income/double",
        // },
      ],
    },
    {
      title: "Manage Gift",
      icon: <Gift size={20} />,
      path: "/admin/gift",
      isPermission : checkPermission(14 ,"Gift"),
    },
    {
      title: "Unit Manage",
      icon: <StraightenIcon size={20} />, // Using 'Gem' as a representation for unit of measurement
      path: "/admin/uom",
      isPermission : checkPermission(15 ,"Unit"),
    },
    {
      title: "Wallet",
      icon: <Wallet size={20} />, // Using 'Gem' as a representation for unit of measurement
      path: "/admin/Wallet",
      isPermission : checkPermission(17 ,"Wallet"),
    },
    {
      title: "Blog Mange  ",
      icon: <PostAdd size={20} />, // Using 'Gem' as a representation for unit of measurement
      path: "/admin/Blog",
      hasSubmenu: true,
      isPermission : checkPermission(18 ,"Blog"),
      submenu: [
        {
          title: "Add Blog",
          path: "/admin/AddBlog",
        },
        {
          title: "View Blog",
          path: "/admin/ViewBlog",
        },
      ]
    },
    {
      title: "Create Admin",
      icon: <SupportAgent size={20} />,
      path: "/admin/Crete_admin",
      isPermission : userType == "ADMIN",
    },
    {
      title: "Testimonial",
      icon: <GalleryVertical size={20} />, // Added icon for Testimonial
      hasSubmenu: true,
      isPermission : checkPermission(16 ,"Testimonial"),
      submenu: [
        {
          title: "Add Testimonial",
          path: "/admin/testimonial/add",
        },
        {
          title: "View Testimonial",
          path: "/admin/testimonial/view",
        },
      ],
    },
  ];

  return (
    <>
      <div 
        className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />
      <div
        className={`fixed md:static top-0 left-0 h-full z-30 md:z-auto transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <Box
          className={`flex flex-col py-4 [background:#383a3a] text-white h-full ${
            isSidebarOpen ? "w-[250px]" : "w-[60px]"
          }`}
        >
          <div className="overflow-y-auto overflow-x-hidden">
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
                {menuItems?.filter((el) => el.isPermission == true ).map((item, index) => (
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
                        <ListItemIcon className="w-8 cursor-pointer " sx={{ color:location.pathname === item.path ? "black" : "white", }}>{item.icon}</ListItemIcon>
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
    </>
  );
};

export default Sidebar;
