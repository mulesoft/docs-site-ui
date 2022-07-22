;(function () {
  /* eslint-disable max-len */
  // prettier-ignore
  var defs = [
    {
      id: 'icon-external',
      viewBox: '0 0 14 14',
      path: { d: 'M6.49887 2.37637C7.46898 0.990919 9.37861 0.654142 10.7641 1.62431C12.1496 2.59448 12.4863 4.50406 11.5162 5.88961L10.2615 7.68148L9.54471 7.17958L10.7994 5.3876C11.4912 4.39959 11.2503 3.03294 10.2622 2.34112C9.27415 1.6492 7.90744 1.89016 7.21563 2.87828L5.96091 4.67015L5.24415 4.16824L6.49887 2.37637ZM8.39301 4.24781L9.10977 4.74972L5.60694 9.75224L4.89018 9.25033L8.39301 4.24781ZM6.78437 11.1218C6.0925 12.1099 4.7258 12.3509 3.73774 11.6589C2.74973 10.9671 2.50871 9.60046 3.20058 8.61235L4.45524 6.82048L3.73848 6.31857L2.48382 8.11044C1.51365 9.496 1.85038 11.4056 3.23588 12.3756C4.62139 13.3459 6.53096 13.0091 7.50113 11.6237L8.75579 9.83182L8.03904 9.3298L6.78437 11.1218Z' },
    },
    {
      id: 'icon-forward-arrow',
      viewBox: '0 0 16 16',
      path: { d: 'M10.4994 3H8.05786L10.8586 7H2.08453C2.02997 7.32544 2 7.65918 2 8C2 8.34082 2.02997 8.67456 2.08453 9H10.8586L8.05786 13H10.4994L14.0004 8L10.4994 3Z' },
    },
    {
      id: 'icon-help',
      viewBox: '0 0 10 10',
      path: { d: 'M2.5 3.74983C2.5 2.36906 3.61927 1.24976 5.00011 1.24976C6.38088 1.24976 7.50023 2.36906 7.50023 3.74983C7.50023 4.91484 6.70349 5.89369 5.62515 6.17125V6.87506H5.00011H4.37508V4.99998H5.00011C5.68939 4.99998 6.25023 4.43922 6.25023 3.74983C6.25023 3.06059 5.68939 2.49983 5.00011 2.49983C4.31084 2.49983 3.75 3.06059 3.75 3.74983H2.5ZM5.00011 9.37514C5.4604 9.37514 5.83351 9.00207 5.83351 8.54186C5.83351 8.0815 5.4604 7.70843 5.00011 7.70843C4.53987 7.70843 4.16676 8.0815 4.16676 8.54186C4.16676 9.00207 4.53987 9.37514 5.00011 9.37514Z' },
    },
    {
      id: 'icon-kabob',
      viewBox: '0 0 16 16',
      paths: [
        { d: 'M13.5 9.5C14.3284 9.5 15 8.82843 15 8C15 7.17157 14.3284 6.5 13.5 6.5C12.6716 6.5 12 7.17157 12 8C12 8.82843 12.6716 9.5 13.5 9.5Z' },
        { d: 'M8 9.5C8.82843 9.5 9.5 8.82843 9.5 8C9.5 7.17157 8.82843 6.5 8 6.5C7.17157 6.5 6.5 7.17157 6.5 8C6.5 8.82843 7.17157 9.5 8 9.5Z' },
        { d: 'M2.5 9.5C3.32843 9.5 4 8.82843 4 8C4 7.17157 3.32843 6.5 2.5 6.5C1.67157 6.5 1 7.17157 1 8C1 8.82843 1.67157 9.5 2.5 9.5Z' },
      ],
    },
    {
      id: 'icon-nav-component',
      viewBox: '0 0 30 30',
      path: { d: 'M19.9035 16.7957L22.0559 24.8282C19.8893 25.7545 17.5053 26.2702 15 26.2702C12.4947 26.2702 10.1107 25.7545 7.94414 24.8282L10.0965 16.7957C7.16563 15.0998 5.19232 11.9329 5.19232 8.30324C5.19232 6.65115 5.6026 5.09557 6.32406 3.72984L12.9574 13.2033H17.0426L23.676 3.72984C24.3974 5.09557 24.8077 6.65115 24.8077 8.30324C24.8077 11.9329 22.8344 15.0998 19.9035 16.7957Z', fill: '#00A2DF' },
    },
    {
      id: 'icon-nav-component-access-management',
      viewBox: '0 0 30 30',
      paths: [
        { d: 'M11.2273 0.0846508L10.2396 3.77061H15.145L14.1573 0.0846508C13.1839 -0.0282168 12.2007 -0.0282168 11.2273 0.0846508ZM4.81323 2.74146L8.11796 4.64943L4.64946 8.11795L2.74146 4.81322C3.34994 4.04513 4.04514 3.34993 4.81323 2.74146ZM3.77061 10.2396L0.0846508 11.2273C-0.0282168 12.2007 -0.0282168 13.1839 0.0846508 14.1573L3.77061 15.145V10.2396ZM2.74146 20.5712L4.64943 17.2665L8.11795 20.735L4.81322 22.643C4.04513 22.0345 3.34993 21.3393 2.74146 20.5712ZM10.2396 21.6139L11.2273 25.2998C12.2007 25.4127 13.1839 25.4127 14.1572 25.2998L15.1449 21.6139H10.2396ZM20.5713 22.6431L17.2665 20.7351L20.735 17.2665L22.643 20.5712C22.0345 21.3394 21.3393 22.0346 20.5713 22.6431ZM21.6139 15.1449L25.2998 14.1572C25.4127 13.1838 25.4127 12.2006 25.2998 11.2273L21.6139 10.2396V15.1448V15.1449ZM22.6431 4.81324L20.7351 8.11797L17.2665 4.64946L20.5712 2.74146C21.3394 3.34994 22.0346 4.04514 22.6431 4.81324Z', transform: 'translate(2.30777 2.30777)', fill: '#087299' },
        { d: 'M0 9.80763C0 4.39103 4.39103 0 9.80763 0C15.2242 0 19.6153 4.39103 19.6153 9.80763C19.6153 15.2242 15.2242 19.6153 9.80763 19.6153C4.39103 19.6153 0 15.2242 0 9.80763ZM2.88456 9.80763C2.88456 13.6311 5.98413 16.7307 9.80763 16.7307C13.6311 16.7307 16.7307 13.6311 16.7307 9.80763C16.7307 5.98413 13.6311 2.88456 9.80763 2.88456C5.98413 2.88456 2.88456 5.98413 2.88456 9.80763Z', transform: 'translate(5.19237 5.19237)', fill: '#00A3E0' },
      ],
    },
    {
      id: 'icon-nav-component-anypoint-cli',
      viewBox: '0 0 16 16',
      paths: [
        { d: 'M15 1H1C0.734784 1 0.48043 1.10536 0.292893 1.29289C0.105357 1.48043 0 1.73478 0 2L0 14C0 14.2652 0.105357 14.5196 0.292893 14.7071C0.48043 14.8946 0.734784 15 1 15H15C15.2652 15 15.5196 14.8946 15.7071 14.7071C15.8946 14.5196 16 14.2652 16 14V2C16 1.73478 15.8946 1.48043 15.7071 1.29289C15.5196 1.10536 15.2652 1 15 1ZM15 14H1V4H15V14Z', fill: '#00A3E0' },
        { d: 'M3.64999 10.85C3.69488 10.8978 3.7491 10.936 3.8093 10.962C3.8695 10.9881 3.9344 11.0015 3.99999 11.0015C4.06559 11.0015 4.13049 10.9881 4.19069 10.962C4.25089 10.936 4.3051 10.8978 4.34999 10.85L5.84999 9.35C5.89782 9.30511 5.93595 9.25089 5.96201 9.1907C5.98807 9.1305 6.00151 9.0656 6.00151 9C6.00151 8.93441 5.98807 8.86951 5.96201 8.80931C5.93595 8.74911 5.89782 8.69489 5.84999 8.65L4.34999 7.15C4.25717 7.05718 4.13127 7.00503 3.99999 7.00503C3.86872 7.00503 3.74282 7.05718 3.64999 7.15C3.55717 7.24283 3.50502 7.36873 3.50502 7.5C3.50502 7.63128 3.55717 7.75718 3.64999 7.85L4.78999 9L3.64999 10.15C3.60216 10.1949 3.56404 10.2491 3.53798 10.3093C3.51192 10.3695 3.49847 10.4344 3.49847 10.5C3.49847 10.5656 3.51192 10.6305 3.53798 10.6907C3.56404 10.7509 3.60216 10.8051 3.64999 10.85V10.85Z', fill: '#087299' },
        { d: 'M9 11H12C12.1326 11 12.2598 10.9473 12.3536 10.8536C12.4473 10.7598 12.5 10.6326 12.5 10.5C12.5 10.3674 12.4473 10.2402 12.3536 10.1464C12.2598 10.0527 12.1326 10 12 10H9C8.86739 10 8.74021 10.0527 8.64645 10.1464C8.55268 10.2402 8.5 10.3674 8.5 10.5C8.5 10.6326 8.55268 10.7598 8.64645 10.8536C8.74021 10.9473 8.86739 11 9 11Z', fill: '#087299' },
      ],
    },
    {
      id: 'icon-nav-component-anypoint-platform-pcf',
      viewBox: '0 0 30 30',
      paths: [
        { d: 'M11.0625 18.2812C11.0625 19.2133 10.307 19.9686 9.37499 19.9686C8.4431 19.9686 7.68756 19.2133 7.68756 18.2812C7.68756 17.3492 8.4431 16.5937 9.37499 16.5937C10.307 16.5937 11.0625 17.3492 11.0625 18.2812Z', fill: '#087299' },
        { d: 'M15.0001 16.5937C14.0681 16.5937 13.3126 17.3492 13.3126 18.2812C13.3126 19.2133 14.0681 19.9686 15.0001 19.9686C15.9321 19.9686 16.6875 19.2133 16.6875 18.2812C16.6875 17.3492 15.9321 16.5937 15.0001 16.5937Z', fill: '#087299' },
        { d: 'M20.6252 16.5937C19.6932 16.5937 18.9377 17.3492 18.9377 18.2812C18.9377 19.2133 19.6932 19.9686 20.6252 19.9686C21.5571 19.9686 22.3127 19.2133 22.3127 18.2812C22.3127 17.3492 21.5571 16.5937 20.6252 16.5937Z', fill: '#087299' },
        { d: 'M22.5001 24.375C25.6066 24.375 28.125 21.8566 28.125 18.75C28.125 16.2973 26.555 14.2126 24.3655 13.4431C24.3715 13.3379 24.375 13.2317 24.375 13.125C24.375 10.0184 21.8566 7.5 18.75 7.5C18.1526 7.5 17.5773 7.59384 17.037 7.76642C15.8369 6.45081 14.1088 5.625 12.1875 5.625C8.66663 5.625 5.79413 8.39767 5.63281 11.879C3.41174 12.9305 1.875 15.1918 1.875 17.8125C1.875 21.4368 4.81317 24.375 8.4375 24.375H22.5001ZM23.7438 15.2119C25.2428 15.7388 26.25 17.1606 26.25 18.75C26.25 20.8177 24.5678 22.5 22.5001 22.5H8.4375C5.85284 22.5 3.75 20.397 3.75 17.8125C3.75 16.0098 4.80402 14.3459 6.43524 13.5736L7.45367 13.0911L7.50586 11.9655C7.62189 9.46152 9.67828 7.5 12.1875 7.5C13.5022 7.5 14.7648 8.05756 15.6517 9.03008L16.4621 9.91837L17.6075 9.55261C17.9765 9.43474 18.3609 9.375 18.75 9.375C20.8178 9.375 22.5 11.0573 22.5 13.125C22.5 13.169 22.499 13.2155 22.4969 13.266C22.496 13.2893 22.4948 13.3134 22.4935 13.3385L22.415 14.745L23.7438 15.2119Z', 'fill-rule': 'evenodd', 'clip-rule': 'evenodd', fill: '#00A3E0' },
      ],
    },
    {
      id: 'icon-nav-component-api-governance',
      viewBox: '0 0 26 26',
      paths: [
        { d: 'M5 15.404V9.5L3 8V16.3957L13 24L23 16.3957V8L21 9.5V15.404L13 21.4874L5 15.404Z', fill: '#087299' },
        { d: 'M9 4L13 7L17 4L19 5.5V14.5L13 19L7 14.5V5.5L9 4ZM9 6.5V13.5L13 16.5L17 13.5V6.5L13 9.5L9 6.5Z', fill: '#00A3E0' },
      ],
    },
    {
      id: 'icon-nav-component-cloudhub-1',
      viewBox: '0 0 30 30',
      paths: [
        { d: 'M11.0625 18.2812C11.0625 19.2133 10.307 19.9686 9.37499 19.9686C8.4431 19.9686 7.68756 19.2133 7.68756 18.2812C7.68756 17.3492 8.4431 16.5937 9.37499 16.5937C10.307 16.5937 11.0625 17.3492 11.0625 18.2812Z', fill: '#087299' },
        { d: 'M15.0001 16.5937C14.0681 16.5937 13.3126 17.3492 13.3126 18.2812C13.3126 19.2133 14.0681 19.9686 15.0001 19.9686C15.9321 19.9686 16.6875 19.2133 16.6875 18.2812C16.6875 17.3492 15.9321 16.5937 15.0001 16.5937Z', fill: '#087299' },
        { d: 'M20.6252 16.5937C19.6932 16.5937 18.9377 17.3492 18.9377 18.2812C18.9377 19.2133 19.6932 19.9686 20.6252 19.9686C21.5571 19.9686 22.3127 19.2133 22.3127 18.2812C22.3127 17.3492 21.5571 16.5937 20.6252 16.5937Z', fill: '#087299' },
        { d: 'M22.5001 24.375C25.6066 24.375 28.125 21.8566 28.125 18.75C28.125 16.2973 26.555 14.2126 24.3655 13.4431C24.3715 13.3379 24.375 13.2317 24.375 13.125C24.375 10.0184 21.8566 7.5 18.75 7.5C18.1526 7.5 17.5773 7.59384 17.037 7.76642C15.8369 6.45081 14.1088 5.625 12.1875 5.625C8.66663 5.625 5.79413 8.39767 5.63281 11.879C3.41174 12.9305 1.875 15.1918 1.875 17.8125C1.875 21.4368 4.81317 24.375 8.4375 24.375H22.5001ZM23.7438 15.2119C25.2428 15.7388 26.25 17.1606 26.25 18.75C26.25 20.8177 24.5678 22.5 22.5001 22.5H8.4375C5.85284 22.5 3.75 20.397 3.75 17.8125C3.75 16.0098 4.80402 14.3459 6.43524 13.5736L7.45367 13.0911L7.50586 11.9655C7.62189 9.46152 9.67828 7.5 12.1875 7.5C13.5022 7.5 14.7648 8.05756 15.6517 9.03008L16.4621 9.91837L17.6075 9.55261C17.9765 9.43474 18.3609 9.375 18.75 9.375C20.8178 9.375 22.5 11.0573 22.5 13.125C22.5 13.169 22.499 13.2155 22.4969 13.266C22.496 13.2893 22.4948 13.3134 22.4935 13.3385L22.415 14.745L23.7438 15.2119Z', 'fill-rule': 'evenodd', 'clip-rule': 'evenodd', fill: '#00A3E0' },
      ],
    },
    {
      id: 'icon-nav-component-cloudhub-2',
      viewBox: '0 0 30 30',
      paths: [
        { d: 'M11.0625 18.2812C11.0625 19.2133 10.307 19.9686 9.37499 19.9686C8.4431 19.9686 7.68756 19.2133 7.68756 18.2812C7.68756 17.3492 8.4431 16.5937 9.37499 16.5937C10.307 16.5937 11.0625 17.3492 11.0625 18.2812Z', fill: '#087299' },
        { d: 'M15.0001 16.5937C14.0681 16.5937 13.3126 17.3492 13.3126 18.2812C13.3126 19.2133 14.0681 19.9686 15.0001 19.9686C15.9321 19.9686 16.6875 19.2133 16.6875 18.2812C16.6875 17.3492 15.9321 16.5937 15.0001 16.5937Z', fill: '#087299' },
        { d: 'M20.6252 16.5937C19.6932 16.5937 18.9377 17.3492 18.9377 18.2812C18.9377 19.2133 19.6932 19.9686 20.6252 19.9686C21.5571 19.9686 22.3127 19.2133 22.3127 18.2812C22.3127 17.3492 21.5571 16.5937 20.6252 16.5937Z', fill: '#087299' },
        { d: 'M22.5001 24.375C25.6066 24.375 28.125 21.8566 28.125 18.75C28.125 16.2973 26.555 14.2126 24.3655 13.4431C24.3715 13.3379 24.375 13.2317 24.375 13.125C24.375 10.0184 21.8566 7.5 18.75 7.5C18.1526 7.5 17.5773 7.59384 17.037 7.76642C15.8369 6.45081 14.1088 5.625 12.1875 5.625C8.66663 5.625 5.79413 8.39767 5.63281 11.879C3.41174 12.9305 1.875 15.1918 1.875 17.8125C1.875 21.4368 4.81317 24.375 8.4375 24.375H22.5001ZM23.7438 15.2119C25.2428 15.7388 26.25 17.1606 26.25 18.75C26.25 20.8177 24.5678 22.5 22.5001 22.5H8.4375C5.85284 22.5 3.75 20.397 3.75 17.8125C3.75 16.0098 4.80402 14.3459 6.43524 13.5736L7.45367 13.0911L7.50586 11.9655C7.62189 9.46152 9.67828 7.5 12.1875 7.5C13.5022 7.5 14.7648 8.05756 15.6517 9.03008L16.4621 9.91837L17.6075 9.55261C17.9765 9.43474 18.3609 9.375 18.75 9.375C20.8178 9.375 22.5 11.0573 22.5 13.125C22.5 13.169 22.499 13.2155 22.4969 13.266C22.496 13.2893 22.4948 13.3134 22.4935 13.3385L22.415 14.745L23.7438 15.2119Z', 'fill-rule': 'evenodd', 'clip-rule': 'evenodd', fill: '#00A3E0' },
      ],
    },
    {
      id: 'icon-nav-component-connector-devkit',
      viewBox: '0 0 30 30',
      paths: [
        { d: 'M6.34585 14.8424L0 19.2858V16.4686L4.03818 13.6411V5.6447L0 2.81714V0L6.34585 4.44341V14.8424Z', transform: 'translate(20.1922 5.35712)', fill: '#087299' },
        { d: 'M14.4224 20.3017V22.7099C13.5003 22.9474 12.5342 23.0757 11.5379 23.0757C5.16568 23.0757 0 17.9101 0 11.5379C0 5.16568 5.16568 0 11.5379 0C12.5342 0 13.5003 0.128313 14.4224 0.36584V2.77403C13.5142 2.47368 12.5455 2.30766 11.5379 2.30766C6.4483 2.30766 2.30766 6.44832 2.30766 11.5379C2.30766 16.6274 6.4483 20.7681 11.5379 20.7681C12.5455 20.7681 13.5142 20.602 14.4224 20.3017Z', transform: 'translate(2.30829 3.46216)', fill: '#00A3E0' },
        { d: 'M7.88931 2.88461H10.9614V5.19232H7.88931C7.39029 6.85632 5.86502 8.07693 4.03845 8.07693C1.80811 8.07693 0 6.26883 0 4.03845C0 1.80811 1.80811 0 4.03845 0C5.86493 0 7.39035 1.22046 7.88931 2.88461ZM1.73077 4.03845C1.73077 5.31091 2.76596 6.34616 4.03845 6.34616C5.31091 6.34616 6.3461 5.31091 6.3461 4.03845C6.3461 2.76602 5.31091 1.73077 4.03845 1.73077C2.76596 1.73077 1.73077 2.76602 1.73077 4.03845Z', transform: 'translate(9.80774 10.9615)', fill: '#114459' },
      ],
    },
    {
      id: 'icon-nav-component-connectors',
      viewBox: '0 0 30 30',
      paths: [
        { d: 'M23.7107 20.2912L25.6058 21.6183C23.5189 24.5933 20.0637 26.5385 16.1538 26.5385C10.5717 26.5385 5.91634 22.5742 4.84715 17.3077H2.3067V12.6923H4.84715C5.91634 7.42578 10.5717 3.46155 16.1538 3.46155C20.0637 3.46155 23.5189 5.40669 25.6058 8.38173L23.7107 9.70882C22.0394 7.32902 19.2761 5.76924 16.1538 5.76924C11.0639 5.76924 6.92307 9.91024 6.92307 15C6.92307 20.0898 11.0639 24.2308 16.1538 24.2308C19.2761 24.2308 22.0394 22.671 23.7107 20.2912Z', fill: '#00A3E0' },
        { d: 'M20.6067 13.8483L27.6934 13.8619L27.6889 16.1538L20.6103 16.1402C20.1004 18.1345 18.3069 19.6154 16.1538 19.6154C13.6049 19.6154 11.5385 17.549 11.5385 15C11.5385 12.4509 13.6049 10.3846 16.1538 10.3846C18.3027 10.3846 20.0927 11.8599 20.6067 13.8483ZM13.8461 15C13.8461 16.2724 14.8814 17.3077 16.1538 17.3077C17.4263 17.3077 18.4615 16.2724 18.4615 15C18.4615 13.7275 17.4263 12.6923 16.1538 12.6923C14.8814 12.6923 13.8461 13.7275 13.8461 15Z', fill: '#087299' },
      ],
    },
    {
      id: 'icon-nav-component-eu-control-plane',
      viewBox: '0 0 30 30',
      paths: [
        { d: 'M27.6076 13.5349L25.6963 13.0229L25.0742 12.8563C24.8108 11.6006 24.3148 10.4329 23.6403 9.39102L23.9614 8.83461L24.9507 7.12097C24.6499 6.74194 24.3252 6.37573 23.9748 6.02509C23.6244 5.67467 23.258 5.34988 22.879 5.04913L21.1655 6.03836L20.6196 6.35376C19.5743 5.66963 18.3995 5.16861 17.1369 4.90036L16.9771 4.30344L16.4649 2.39227C15.9843 2.33711 15.4955 2.30759 15 2.30759C14.5045 2.30759 14.0158 2.33711 13.535 2.39227L13.023 4.30344L12.8654 4.8912C11.5959 5.15671 10.4153 5.65887 9.364 6.34415L8.83459 6.03836L7.12107 5.04913C6.74204 5.34988 6.3756 5.67467 6.0253 6.02509C5.67488 6.37573 5.3501 6.74194 5.04923 7.12097L6.03857 8.83461L6.34413 9.36401C5.65897 10.415 5.15646 11.5956 4.8913 12.8654L4.30376 13.0229L2.39249 13.5349C2.33721 14.0158 2.3078 14.5042 2.3078 15C2.3078 15.4955 2.33721 15.9842 2.39249 16.4648L4.30399 16.9771L4.90012 17.1368C5.16848 18.3994 5.66962 19.5744 6.35363 20.6195L6.0388 21.1649L5.04923 22.879C5.3501 23.2581 5.67488 23.6243 6.0253 23.9747C6.3756 24.3251 6.74204 24.6499 7.12107 24.9509L8.83471 23.9612L9.39078 23.6403C10.4328 24.315 11.6009 24.8108 12.8563 25.0742L13.023 25.6968L13.535 27.6075C14.0158 27.6627 14.5045 27.6922 15 27.6922C15.4955 27.6922 15.9843 27.6627 16.4649 27.6075L16.977 25.6968L17.1461 25.0653C18.3945 24.7989 19.5566 24.304 20.5927 23.6307L21.1654 23.9612L22.879 24.9509C23.258 24.6499 23.6244 24.3251 23.9748 23.9747C24.3252 23.6243 24.6499 23.2581 24.9507 22.879L23.9613 21.1652L23.6308 20.5925C24.3043 19.5566 24.799 18.3943 25.0654 17.146L25.6962 16.9771L27.6076 16.4648C27.6629 15.9842 27.6922 15.4955 27.6922 15C27.6922 14.5042 27.6629 14.0158 27.6076 13.5349Z', fill: '#00A3E0' },
        { d: 'M14.9839 23.4215C10.3315 23.4215 6.54645 19.6362 6.54645 14.984C6.54645 10.3317 10.3315 6.54648 14.9839 6.54648C19.6364 6.54648 23.4214 10.3317 23.4214 14.984C23.4214 19.6362 19.6364 23.4215 14.9839 23.4215Z', fill: 'white' },
        { d: 'M19.6875 15C19.6875 17.5889 17.5888 19.6875 15 19.6875C12.4111 19.6875 10.3125 17.5889 10.3125 15C10.3125 12.4111 12.4111 10.3125 15 10.3125C17.5888 10.3125 19.6875 12.4111 19.6875 15Z', fill: '#087299' },
      ],
    },
    {
      id: 'icon-nav-component-general',
      viewBox: '0 0 14 15',
      paths: [
        { d: 'M1.36278 0L1.36787 3.94183L7.40742 3.95558L7.40236 0.0376971L8.73519 0.00265382L8.6981 5.27362L0 5.28486L0.0369378 0.0348597L1.36278 0Z', transform: 'translate(2.8598 6.64626)', fill: '#00A3E0' },
        { d: 'M6.00319 0L11.7143 4.23063V5.86337L5.97677 1.61317L0 5.5623L0.137638 3.91056L6.00319 0Z', transform: 'translate(1.198 1.32681) scale(0.999808) rotate(-1.50596)', fill: '#087299' },
      ],
    },
    {
      id: 'icon-nav-component-gov-cloud',
      viewBox: '0 0 30 30',
      paths: [
        { d: 'M15 10.3846V8.0769H27.6923L26.3654 10.3846H15Z', fill: '#087299' },
        { d: 'M15 17.3077V19.6154H25.3846L24.0577 17.3077H15Z', fill: '#087299' },
        { d: 'M15 21.9231V24.2308H27.6923L26.3654 21.9231H15Z', fill: '#087299' },
        { d: 'M15 15V12.6923H25.3846L24.0577 15H15Z', fill: '#087299' },
        { d: 'M15 10.3846H3.46155V12.6923H15V10.3846Z', fill: '#00A3E0' },
        { d: 'M15 5.76929H3.46155V8.07698H15V5.76929Z', fill: '#00A3E0' },
        { d: 'M15 19.6154H3.46155V21.923H15V19.6154Z', fill: '#087299' },
        { d: 'M15 15H3.46155V17.3077H15V15Z', fill: '#087299' },
      ],
    },
    {
      id: 'icon-nav-component-home',
      viewBox: '0 0 14 15',
      paths: [
        { d: 'M1.36278 0L1.36787 3.94183L7.40742 3.95558L7.40236 0.0376971L8.73519 0.00265382L8.6981 5.27362L0 5.28486L0.0369378 0.0348597L1.36278 0Z', transform: 'translate(2.8598 6.64626)', fill: '#00A3E0' },
        { d: 'M6.00319 0L11.7143 4.23063V5.86337L5.97677 1.61317L0 5.5623L0.137638 3.91056L6.00319 0Z', transform: 'translate(1.198 1.32681) scale(0.999808) rotate(-1.50596)', fill: '#087299' },
      ],
    },
    {
      id: 'icon-nav-component-hosting-home',
      viewBox: '0 0 30 30',
      paths: [
        { d: 'M21.098 16.656c0 .673-.546 1.219-1.219 1.219s-1.219-.546-1.219-1.219.546-1.219 1.219-1.219 1.219.546 1.219 1.219zm-5.805-1.219c-.673 0-1.219.546-1.219 1.219s.546 1.219 1.219 1.219 1.219-.546 1.219-1.219-.546-1.219-1.219-1.219zm4.586-7.272c-.673 0-1.219.546-1.219 1.219s.546 1.219 1.219 1.219 1.219-.546 1.219-1.219-.546-1.219-1.219-1.219zm-4.586 0c-.673 0-1.219.546-1.219 1.219s.546 1.219 1.219 1.219 1.219-.546 1.219-1.219-.546-1.219-1.219-1.219z', fill: '#087299' },
        { d: 'M3.25 15.437c0 2.24 1.823 4.063 4.063 4.063h4.057v1.625H7.313c-3.141 0-5.687-2.547-5.687-5.688 0-2.271 1.331-4.23 3.256-5.142.14-3.017 2.629-5.42 5.681-5.42h.807V6.5h-.807c-2.175 0-3.957 1.7-4.058 3.87l-.045.976-.882.418c-1.414.669-2.328 2.111-2.328 3.673zM14.625 4.898v1.625L22.75 6.5v5.688h-8.125v1.624h8.125V19.5h-8.125v1.625h9.749V4.875l-9.749.023z', fill: '##00A1DF' },
      ],
    },
    {
      id: 'icon-nav-component-private-cloud',
      viewBox: '0 0 30 30',
      paths: [
        { d: 'M22.9371 9.42138C22.1605 9.42138 21.5309 10.051 21.5309 10.8276C21.5309 11.6042 22.1605 12.2337 22.9371 12.2337C23.7137 12.2337 24.3433 11.6042 24.3433 10.8276C24.3433 10.051 23.7137 9.42138 22.9371 9.42138ZM16.2395 19.2185C16.2395 18.4419 16.8691 17.8124 17.6457 17.8124C18.4223 17.8124 19.0519 18.4419 19.0519 19.2185C19.0519 19.9952 18.4223 20.6247 17.6457 20.6247C16.8691 20.6247 16.2395 19.9952 16.2395 19.2185ZM22.9371 20.6247C23.7137 20.6247 24.3433 19.9952 24.3433 19.2185C24.3433 18.4419 23.7137 17.8124 22.9371 17.8124C22.1605 17.8124 21.5309 18.4419 21.5309 19.2185C21.5309 19.9952 22.1605 20.6247 22.9371 20.6247ZM16.2396 10.8276C16.2396 10.051 16.8691 9.42138 17.6458 9.42138C18.4224 9.42138 19.0519 10.051 19.0519 10.8276C19.0519 11.6042 18.4224 12.2337 17.6458 12.2337C16.8691 12.2337 16.2396 11.6042 16.2396 10.8276Z', 'fill-rule': 'evenodd', 'clip-rule': 'evenodd', fill: '#087299' },
        { d: 'M8.43781 22.4996C5.85327 22.4996 3.75055 20.3969 3.75055 17.8124C3.75055 16.0098 4.80457 14.3459 6.43567 13.5736L7.45404 13.0913L7.50616 11.9658C7.62219 9.46182 9.67853 7.50038 12.1876 7.50038H13.1197V5.62548H12.1876C8.66693 5.62548 5.79456 8.39819 5.6333 11.879C3.41229 12.9307 1.87567 15.1917 1.87567 17.8124C1.87567 21.4365 4.8136 24.3745 8.43781 24.3745H13.1197V22.4996H8.43781ZM16.8749 7.52675V5.65185L28.1243 5.62548V24.3745H16.8749V22.4996H26.2495V15.9374H16.875V14.0626H26.2495V7.50038L16.8749 7.52675Z', 'fill-rule': 'evenodd', 'clip-rule': 'evenodd', fill: '#00A1DF' },
      ],
    },
    {
      id: 'icon-nav-component-release-notes',
      viewBox: '0 0 30 30',
      paths: [
        { d: 'M10.3213 8.98214H15.3034V10.6429H10.3213V8.98214Z', fill: '#114459' },
        { d: 'M10.3213 13.9643H20.2856V15.625H10.3213V13.9643Z', fill: '#087299' },
        { d: 'M10.3213 17.2857H20.2856V18.9464H10.3213V17.2857Z', fill: '#087299' },
        { d: 'M10.3213 20.6071H20.2856V22.2679H10.3213V20.6071Z', fill: '#087299' },
        { d: 'M7 4H23.6071V27.25H7V4ZM21.9465 25.5893V5.66072H8.66077V25.5893H21.9465Z', fill: '#00A3E0' },
      ],
    },
    {
      id: 'icon-nav-component-rtf-cloud',
      viewBox: '0 0 30 30',
      paths: [
        { d: 'M11.0625 18.2812C11.0625 19.2133 10.307 19.9686 9.37499 19.9686C8.4431 19.9686 7.68756 19.2133 7.68756 18.2812C7.68756 17.3492 8.4431 16.5937 9.37499 16.5937C10.307 16.5937 11.0625 17.3492 11.0625 18.2812Z', fill: '#087299' },
        { d: 'M15.0001 16.5937C14.0681 16.5937 13.3126 17.3492 13.3126 18.2812C13.3126 19.2133 14.0681 19.9686 15.0001 19.9686C15.9321 19.9686 16.6875 19.2133 16.6875 18.2812C16.6875 17.3492 15.9321 16.5937 15.0001 16.5937Z', fill: '#087299' },
        { d: 'M20.6252 16.5937C19.6932 16.5937 18.9377 17.3492 18.9377 18.2812C18.9377 19.2133 19.6932 19.9686 20.6252 19.9686C21.5571 19.9686 22.3127 19.2133 22.3127 18.2812C22.3127 17.3492 21.5571 16.5937 20.6252 16.5937Z', fill: '#087299' },
        { d: 'M22.5001 24.375C25.6066 24.375 28.125 21.8566 28.125 18.75C28.125 16.2973 26.555 14.2126 24.3655 13.4431C24.3715 13.3379 24.375 13.2317 24.375 13.125C24.375 10.0184 21.8566 7.5 18.75 7.5C18.1526 7.5 17.5773 7.59384 17.037 7.76642C15.8369 6.45081 14.1088 5.625 12.1875 5.625C8.66663 5.625 5.79413 8.39767 5.63281 11.879C3.41174 12.9305 1.875 15.1918 1.875 17.8125C1.875 21.4368 4.81317 24.375 8.4375 24.375H22.5001ZM23.7438 15.2119C25.2428 15.7388 26.25 17.1606 26.25 18.75C26.25 20.8177 24.5678 22.5 22.5001 22.5H8.4375C5.85284 22.5 3.75 20.397 3.75 17.8125C3.75 16.0098 4.80402 14.3459 6.43524 13.5736L7.45367 13.0911L7.50586 11.9655C7.62189 9.46152 9.67828 7.5 12.1875 7.5C13.5022 7.5 14.7648 8.05756 15.6517 9.03008L16.4621 9.91837L17.6075 9.55261C17.9765 9.43474 18.3609 9.375 18.75 9.375C20.8178 9.375 22.5 11.0573 22.5 13.125C22.5 13.169 22.499 13.2155 22.4969 13.266C22.496 13.2893 22.4948 13.3134 22.4935 13.3385L22.415 14.745L23.7438 15.2119Z', 'fill-rule': 'evenodd', 'clip-rule': 'evenodd', fill: '#00A3E0' },
      ],
    },
    {
      id: 'icon-nav-component-runtime-fabric',
      viewBox: '0 0 30 30',
      paths: [
        { d: 'M6.78809 16.5508H17.4219V18.2169H6.78809V16.5508Z', fill: '#087299' },
        { d: 'M17.4321 18.9957C18.3548 18.9901 19.0983 18.2396 19.0927 17.3194C19.087 16.3993 18.3345 15.6579 17.4118 15.6635C16.489 15.6691 15.7456 16.4196 15.7512 17.3398C15.7568 18.26 16.5093 19.0014 17.4321 18.9957Z', fill: '#114459' },
        { d: 'M21.5723 12.6392L25.1296 12.6369L25.1342 20.7185L20.6538 20.715L20.745 20.7173L4.87039 20.7288L4.86577 14.0642L12.3508 14.0596L12.3404 12.3935L3.19385 12.4004L3.20077 22.3962L20.7462 22.3846L21.5227 22.3835L26.8062 22.3927L26.8004 10.9627L23.2142 10.9638C22.9047 7.9831 20.3899 5.72001 17.3931 5.72539C15.7486 5.72412 14.1797 6.41617 13.0719 7.63154C10.4935 6.81252 7.72964 8.18346 6.82154 10.7319L8.65731 10.7308C9.44324 9.37217 11.0686 8.74335 12.5642 9.21923L13.5854 9.54346L14.3077 8.75423C15.1006 7.88839 16.2202 7.39454 17.3942 7.39269C19.6226 7.38398 21.4626 9.13149 21.5688 11.3573L21.5665 11.5165', fill: '#00A3E0' },
      ],
    },
    {
      id: 'icon-nav-component-runtime-manager',
      viewBox: '0 0 30 30',
      paths: [
        { d: 'M26.5385 15C26.5385 8.62749 21.3725 3.46155 15 3.46155C8.62748 3.46155 3.46154 8.62749 3.46154 15C3.46154 20.3765 7.13879 24.8941 12.1154 26.175V24.3758C8.1067 23.144 5.19231 19.4126 5.19231 15C5.19231 9.58337 9.58337 5.19232 15 5.19232C20.4166 5.19232 24.8077 9.58337 24.8077 15C24.8077 17.6982 23.7177 20.1415 21.9545 21.9147L22.961 23.3522C25.1651 21.2507 26.5385 18.2858 26.5385 15Z', fill: '#087299' },
        { d: 'M23.0792 26.5385L17.974 19.2472C19.3124 18.308 20.1924 16.7594 20.1924 15.0001C20.1924 12.1326 17.8677 9.80786 15.0001 9.80786C12.1324 9.80786 9.80776 12.1326 9.80776 15.0001C9.80776 17.8678 12.1324 20.1925 15.0001 20.1925C15.2492 20.1925 15.4888 20.1567 15.728 20.121L15.7647 20.1155L20.2621 26.5385H23.0792ZM12.1155 15.0002C12.1155 13.4071 13.407 12.1156 15.0001 12.1156C16.5932 12.1156 17.8847 13.4071 17.8847 15.0002C17.8847 16.5934 16.5932 17.8849 15.0001 17.8849C13.407 17.8849 12.1155 16.5934 12.1155 15.0002ZM12.6923 22.3851L10.3846 20.7693V26.5386H12.6923V22.3851Z', 'fill-rule': 'evenodd', 'clip-rule': 'evenodd', fill: '#00A3E0' },
      ],
    },
    {
      id: 'icon-nav-group',
      viewBox: '0 0 16 16',
      path: { d: 'M 3.7675781,4 2.2324219,5.28125 8,12.203125 13.767578,5.28125 12.232422,4 8,9.078125 Z' },
    },
    {
      id: 'icon-nav-page-general-browser-support',
      viewBox: '0 0 16 16',
      paths: [
        { d: 'M7.99994 16C5.67994 16 3.86279 12.4857 3.86279 8C3.86279 3.51429 5.67994 0 7.99994 0C10.3199 0 12.1371 3.51429 12.1371 8C12.1371 12.4857 10.3199 16 7.99994 16ZM7.99994 1.14286C6.58394 1.14286 5.00565 3.95886 5.00565 8C5.00565 12.0411 6.58394 14.8571 7.99994 14.8571C9.41593 14.8571 10.9942 12.0411 10.9942 8C10.9942 3.95886 9.41593 1.14286 7.99994 1.14286Z', fill: '#00A3E0' },
        { d: 'M8 16C6.41775 16 4.87103 15.5308 3.55544 14.6518C2.23985 13.7727 1.21447 12.5233 0.608967 11.0615C0.00346627 9.59966 -0.15496 7.99113 0.153721 6.43928C0.462403 4.88743 1.22433 3.46197 2.34315 2.34315C3.46197 1.22433 4.88743 0.462403 6.43928 0.153721C7.99113 -0.15496 9.59966 0.00346627 11.0615 0.608967C12.5233 1.21447 13.7727 2.23985 14.6518 3.55544C15.5308 4.87103 16 6.41775 16 8C15.9976 10.121 15.1539 12.1544 13.6542 13.6542C12.1544 15.1539 10.121 15.9976 8 16ZM8 1.14286C6.64379 1.14286 5.31803 1.54502 4.19038 2.2985C3.06273 3.05197 2.18383 4.12291 1.66483 5.37589C1.14583 6.62887 1.01003 8.00761 1.27462 9.33776C1.5392 10.6679 2.19228 11.8897 3.15127 12.8487C4.11026 13.8077 5.33209 14.4608 6.66224 14.7254C7.9924 14.99 9.37114 14.8542 10.6241 14.3352C11.8771 13.8162 12.948 12.9373 13.7015 11.8096C14.455 10.682 14.8571 9.35622 14.8571 8C14.8553 6.18193 14.1323 4.43885 12.8467 3.15328C11.5612 1.86771 9.81807 1.14468 8 1.14286Z', fill: '#00A3E0' },
        { d: 'M15.4284 7.42871H0.571289V8.57157H15.4284V7.42871Z', fill: '#00A3E0' },
        { d: 'M8.57157 0.571289H7.42871V15.4284H8.57157V0.571289Z', fill: '#00A3E0' },
      ],
    },
    {
      id: 'icon-nav-page-general-api-led-overview',
      viewBox: '0 0 16 16',
      path: { d: 'M1 4.87561L8 3L15 4.87561V5.12439L8 7L1 5.12439V4.87561ZM8 8.96472L13 7.625V8.66028L8 10L3 8.66028V7.625L8 8.96472ZM3 10.625V11.6603L8 13L13 11.6603V10.625L8 11.9647L3 10.625Z', fill: '#00A3E0' },
    },
    {
      id: 'icon-nav-page-general-contribute',
      viewBox: '0 0 30 30',
      path: { d: 'M19.9035 16.7957L22.0559 24.8282C19.8893 25.7545 17.5053 26.2702 15 26.2702C12.4947 26.2702 10.1107 25.7545 7.94414 24.8282L10.0965 16.7957C7.16563 15.0998 5.19232 11.9329 5.19232 8.30324C5.19232 6.65115 5.6026 5.09557 6.32406 3.72984L12.9574 13.2033H17.0426L23.676 3.72984C24.3974 5.09557 24.8077 6.65115 24.8077 8.30324C24.8077 11.9329 22.8344 15.0998 19.9035 16.7957Z', fill: '#00A2DF' },
    },
    {
      id: 'icon-nav-page-general-glossary',
      viewBox: '0 0 16 16',
      path: { d: 'M13.9998 5.20117V14.0425L12.5118 15L7.99982 11.8407L3.48792 15L1.99951 14.0422V5.20142L7.99982 1L13.9998 5.20117ZM11.9998 7.39502L7.99963 4.59424V5.81494L11.9998 8.61596V7.39502ZM11.9998 11.4058L7.99963 8.60487V7.38405L11.9998 10.1851V11.4058ZM7.99982 2.2207L12.9998 5.7218V13.4968L12.5353 13.7957L7.99982 10.6199L3.46436 13.7957L2.99951 13.4966V5.72204L7.99982 2.2207Z', 'fill-rule': 'evenodd', fill: '#00A3E0' },
    },
    {
      id: 'icon-nav-page-general-intro-platform-hosting',
      viewBox: '0 0 16 16',
      path: { d: 'M1 7.5V1.5H15V7.5H1ZM2 6.5H14V2.5H2V6.5ZM1 14.5H15V8.5H1V14.5ZM14 9.5H2V13.5H14V9.5ZM3 4.5C3 3.94751 3.44769 3.5 4 3.5C4.55225 3.5 5 3.94751 5 4.5C5 5.05225 4.55225 5.5 4 5.5C3.44769 5.5 3 5.05225 3 4.5ZM8 3.5C7.44769 3.5 7 3.94751 7 4.5C7 5.05225 7.44769 5.5 8 5.5C8.55225 5.5 9 5.05225 9 4.5C9 3.94751 8.55225 3.5 8 3.5ZM11 4.5C11 3.94751 11.4477 3.5 12 3.5C12.5522 3.5 13 3.94751 13 4.5C13 5.05225 12.5522 5.5 12 5.5C11.4477 5.5 11 5.05225 11 4.5ZM4 12.5C4.55225 12.5 5 12.0522 5 11.5C5 10.9475 4.55225 10.5 4 10.5C3.44769 10.5 3 10.9475 3 11.5C3 12.0522 3.44769 12.5 4 12.5ZM9 11.5C9 12.0522 8.55225 12.5 8 12.5C7.44769 12.5 7 12.0522 7 11.5C7 10.9475 7.44769 10.5 8 10.5C8.55225 10.5 9 10.9475 9 11.5ZM12 12.5C12.5522 12.5 13 12.0522 13 11.5C13 10.9475 12.5522 10.5 12 10.5C11.4477 10.5 11 10.9475 11 11.5C11 12.0522 11.4477 12.5 12 12.5Z', 'fill-rule': 'evenodd', fill: '#00A3E0' },
    },
    {
      id: 'icon-nav-version',
      viewBox: '0 0 30 30',
      path: { d: 'M 15.00375,23.71 4.45375,8.645 6.86375,8 15.00375,19.62375 23.13625,8 l 2.41,0.645 z' },
    },
    {
      id: 'icon-search',
      viewBox: '0 0 30 30',
      path: { d: 'M20.262 19.557l3.82 5.455a15.981 15.981 0 0 1-3.07 2.154L17.2 21.72a9.331 9.331 0 0 1-3.73.78 9.375 9.375 0 1 1 9.376-9.375c0 2.497-.992 4.752-2.583 6.432zM13.47 5.625c-4.136 0-7.5 3.364-7.5 7.5s3.364 7.5 7.5 7.5c4.135 0 7.5-3.364 7.5-7.5s-3.365-7.5-7.5-7.5z' },
    },
  ]
  var icondefs = Object.assign(document.createElement('div'), { id: 'icondefs', hidden: true })
  icondefs.appendChild(
    defs.reduce(function (parent, icondef) {
      var symbol = Object.assign(document.createElementNS('http://www.w3.org/2000/svg', 'symbol'), { id: icondef.id })
      symbol.setAttribute('viewBox', icondef.viewBox)
      var contents = icondef.contents || icondef.paths || [icondef.path]
      if (Array.isArray(contents)) {
        contents.forEach(function (props) {
          symbol.appendChild(
            Object.entries(props).reduce(function (tag, prop) {
              tag.setAttribute(prop[0], prop[1])
              return tag
            }, document.createElementNS('http://www.w3.org/2000/svg', 'path'))
          )
        })
      } else {
        symbol.innerHTML = contents
      }
      parent.appendChild(symbol)
      return parent
    }, document.createElementNS('http://www.w3.org/2000/svg', 'svg'))
  )
  document.body.appendChild(icondefs)
})()
