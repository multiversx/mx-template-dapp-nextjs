[upgrade to tailwind v4]
ADD `taillwind.css` file with all variables and IMPORT it in `initConfig.ts`
ADD DEFAULT VALUE FOR `theme` in `initConfig.ts`
UPDATE `globals.css` file with the tailwind v4 config

[
    ADD LINKS CONSTANTS [`installExtensionsLinks.ts` in `localConstants`]
    ADD DASHBOARD LINKS [`dashboardLinks.ts` in `localConstants`]
    ADD BROWSER ENUM [`browser.enum.ts` in `localConstants`]

    ADD ALL SVG ICONS IN ASSETS
    ADD dark/light/vibe theme background images IN ASSETS
    ADD `getDetectedBrowser.ts` file in `helpers`
]

IMPORT `Button`, `CopyButton` & `Trim` components from `sdk-dapp-ui`
UPDATE `Layout` component 

# HOMEPAGE
UPDATE `Home` page

## NAVIGATION BAR: 
    -> change logo (made in CSS)
    -> change styles for: Github & Notifications buttons, environment label, connect button
    -> add theme switcher (with tooltip)

    UPDATE `Header.tsx` file
    UPDATE `Button` component
    ADD `AddressComponent`, `Logo`, `Tooltip` components
    ADD `ThemeTooltip` component
    REMOVE `GithubButton.tsx`, `NotificationsButton.tsx`, `ConnectButton.tsx` files

## HERO SECTION:
    -> update background image; it changes when the theme changes
    -> update title & description
    -> remove 'Send transaction' button - add 'Connect Wallet' + 'See Documentation' buttons
    -> add theme switch buttons 

    ADD `HeroComponent.tsx` file

## HOW TO CONNECT SECTION:
    -> new section - grid with the methods you can connect
    -> create ConnectCard component that contains: icon, title, description, download link
    -> for wallet extension add also image + supported browsers logos.

    ADD `HowToConnectComponent.tsx` file
    ADD `ConnectCard.tsx`, `ExtensionConnect.tsx` and `BrowserFrame.tsx` files

    
## FOOTER:
    -> remove Disclaimer - add version and network build

    UPDATE `Footer.tsx` file



--------------------

# DASHBOARD PAGE

UPDATE `Dashboard` page
ADD `DashboardHeader` & `LeftPanel` components
ADD `dashboard.types.ts` file
REMOVE `Account` from WIDGETS -> UPDATED version will be in `LeftPanel` component
UPDATE  `Transactions` component from `Dashboard`
UPDATE `transactions.types.ts`
UPDATE `config`
ADD general `PingPongComponent` in components
UPDATE `PingPongAbi`, `PingPongRaw` & `PingPongService` components
UPDATE `OutputContainer` & `PingPongOutput` comp
UPDATE `Label` comp
UPDATE `Card` comp
UPDATE `SignMessage` comp
UPDATE `NativeAuth`, `MissingNativeAuthError` & `Username` comp
UPDATE `BatchTransactions` comp
UPDATE `TransactionOutput` & `TransactionsOutput` comp