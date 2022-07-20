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
      id: 'icon-nav-component-api-governance',
      viewBox: '0 0 26 26',
      paths: [
        { d: 'M5 15.404V9.5L3 8V16.3957L13 24L23 16.3957V8L21 9.5V15.404L13 21.4874L5 15.404Z', fill: '#087299' },
        { d: 'M9 4L13 7L17 4L19 5.5V14.5L13 19L7 14.5V5.5L9 4ZM9 6.5V13.5L13 16.5L17 13.5V6.5L13 9.5L9 6.5Z', fill: '#00A3E0' },
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
      id: 'icon-nav-component-home',
      viewBox: '0 0 14 15',
      paths: [
        { d: 'M1.36278 0L1.36787 3.94183L7.40742 3.95558L7.40236 0.0376971L8.73519 0.00265382L8.6981 5.27362L0 5.28486L0.0369378 0.0348597L1.36278 0Z" transform="translate(2.8598 6.64626)', fill: '#00A3E0' },
        { d: 'M6.00319 0L11.7143 4.23063V5.86337L5.97677 1.61317L0 5.5623L0.137638 3.91056L6.00319 0Z" transform="translate(1.198 1.32681) scale(0.999808) rotate(-1.50596)', fill: '#087299' },
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
      id: 'icon-nav-component-rtfcloud',
      viewBox: '0 0 26 26',
      paths: [
        { d: 'M17.0999775,17.9711609v2.4376793c-1.4507236,1.0019722-3.2073526,1.5911026-5.099968,1.5911026 c-4.9625907,0-8.9999428-4.0373516-8.9999428-8.9999418s4.0373526-8.9999428,8.9999428-8.9999428 c1.8926153,0,3.6492443,0.5891318,5.099968,1.5911031V8.028841l-1.0862598-0.7611527 c-1.1365538-0.797688-2.5196991-1.2676435-4.0137081-1.2676435c-3.8659668,0-6.9999557,3.1339893-6.9999557,6.9999561 s3.1339889,6.9999552,6.9999557,6.9999552c1.494009,0,2.8771544-0.4699554,4.0137081-1.267643L17.0999775,17.9711609z', fill: '#989A9B' },
        { d: 'M20,7.6191406V12h-5.1843262C14.4014893,10.838623,13.3018799,10,12,10 c-1.6541748,0-2.999939,1.3458252-2.999939,3S10.3458252,16,12,16c1.3018799,0,2.4015503-0.838623,2.8156738-2H20v4.3808594 l1.999939-1.4003906V9.0195312L20,7.6191406z M12,14.5c-0.8284302,0-1.5-0.6716309-1.5-1.5s0.6715698-1.5,1.5-1.5 s1.5,0.6716309,1.5,1.5S12.8284302,14.5,12,14.5z', fill: '#58595A' },
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
