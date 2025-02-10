import { images } from "../assets/images/images";
import { AuthScreens, ProfileScreens } from "../navigation/ScreenNames";

//help and support image imports
import UserIcon from "../assets/images/helpNSupport/userIcon.svg";
import CancelNRefundIcon from "../assets/images/helpNSupport/CancelNRefund.svg";
import BillingIcon from "../assets/images/helpNSupport/billingIcon.svg";
import OngoingOrderIcon from "../assets/images/helpNSupport/ongoingOrder.svg";
import PostOrderSupportIcon from "../assets/images/helpNSupport/postOrderSupport.svg";
import PromoCodeIcon from "../assets/images/helpNSupport/promoCode.svg";
import ReportIssueIcon from "../assets/images/helpNSupport/reportIssue.svg";
import ThreeDotIcon from "../assets/images/helpNSupport/threeDot.svg";

// home screen data
export const gridButtons = [
    {
        id: 1,
        title: 'SEND A PACKAGE',
        subTitle: 'Fast and secure delivery, every time.',
        image: images.PackageImg,
    },
    { id: 2, title: 'BUY FROM STORE', subTitle: 'From store to your door, hassle-free.', image: images.Store },
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
    { label: "OTP Verification", icon: images.otpVerify },
    { label: "Do not ring the bell", icon: images.doNotRing },
    { label: "Drop-off at the door", icon: images.doorDropOff },
    { label: "Avoid calling", icon: images.avoidCall },
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

export const beforeYouSendPoints = [
    'Avoid sending expensive or fragile items',
    'Items should weigh less than 8 kg and fit comfortably in a car.',
    'No alcohol, illegal, or restricted items',
];

export const supportOptions = [
    { id: "1", title: "Account & Profile", icon: UserIcon },
    { id: "2", title: "Payments & Billing", icon: BillingIcon },
    { id: "3", title: "Cancellation & Refunds", icon: CancelNRefundIcon },
    { id: "4", title: "Ongoing Orders", icon: OngoingOrderIcon },
    { id: "5", title: "Post-Order Support", icon: PostOrderSupportIcon },
    { id: "6", title: "Promo Codes & Referrals", icon: PromoCodeIcon },
    { id: "7", title: "Reports & Issue Management", icon: ReportIssueIcon },
    { id: "8", title: "Buy From A Store", icon: UserIcon },
    { id: "9", title: "Others", icon: ThreeDotIcon },
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