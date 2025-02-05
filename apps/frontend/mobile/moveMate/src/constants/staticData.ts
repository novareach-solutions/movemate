import { images } from "../assets/images/images";
import { AuthScreens, ProfileScreens } from "../navigation/ScreenNames";
// home screen data
export const gridButtons = [
    {
        id: 1,
        title: 'SEND A PACKAGE',
        subTitle: 'Hassle-Free',
        image: images.PackageImg,
    },
    { id: 2, title: 'BUY FROM STORE', subTitle: 'Easy Shop', image: images.Store },
    { id: 3, title: 'CAR TOWING', subTitle: 'Fast Tow', image: images.TowTruck },
    {
        id: 4,
        title: 'HOME MOVING',
        subTitle: 'Swift Shifting',
        image: images.ShoppingCart,
    },
];

export const profileData = [
    // {
    //     id: '1',
    //     title: 'Refunds',
    //     icon: images.profileInbox,
    //     screen: ProfileScreens.Inbox,
    //     notificationCount: 3,
    // },
    {
        id: '2',
        title: 'Manage Addresses',
        icon: images.ManageAddress,
        screen: ProfileScreens.SavedAddressesScreen,
    },
    {
        id: '3',
        title: 'Refer Friends',
        icon: images.InviteFriends,
        screen: ProfileScreens.ReferFriendsScreen,
    },
    {
        id: '4',
        title: 'Legal & About',
        icon: images.LegalNAbout,
        screen: ProfileScreens.LegalAboutScreen,
    },
    {
        id: '5',
        title: 'Give A Feedback',
        icon: images.HelpNSupport,
        screen: ProfileScreens.FeedbackScreen,
    },
    // {
    //     id: '6',
    //     title: 'Invite Friends',
    //     icon: images.profileRewards,
    //     screen: ProfileScreens.Rewards,
    // },
    {
        id: '7',
        title: 'Log Out',
        icon: images.Logout,
        screen: AuthScreens.LoginScreen,
        isLogout: true,
    },
];

export const cards = [
    {
        id: 1,
        type: "Visa",
        bank: "Bank of Melbourne",
        last4: "1234",
        icon: images.VisaIcon,
    },
    {
        id: 2,
        type: "MasterCard",
        bank: "Bank of Melbourne",
        last4: "1234",
        icon: images.MasterCardIcon,
    },
];

export const wallets = [
    { id: 3, name: "PayPal", icon: images.PaypalIcon },
    { id: 4, name: "Apple Pay", icon: images.AppleIcon },
];

export const deliveryInstructions = [
    { label: "OTP Verification", icon: images.pickUpNotesIcon },
    { label: "Do not ring the bell", icon: images.doNotRing },
    { label: "Drop-off at the door", icon: images.doorDropOff },
    { label: "Avoid calling", icon: images.phone },
];

export const packageOptions = [
    {
        icon: images.documentIcon,
        title: 'Documents'
    },
    {
        icon: images.foodIcon,
        title: 'Food'
    },
    {
        icon: images.electricIcon,
        title: 'Electric Item'
    },
    {
        icon: images.laundryIcon,
        title: 'Laundry'
    },
    {
        icon: images.otherIcon,
        title: 'Others'
    },
];

// export const savedLocationType = [
//     {
//         icon:images.HomeIcon,
//         title:'Home'
//     },
//     {
//         icon:,
//         title:'Work'
//     },
//     {
//         icon:,
//         title:'Other'
//     },
// ]