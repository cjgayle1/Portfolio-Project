const themes = {
    dark: {
      '--primary-bg-color': '#0f172a',
      '--secondary-bg-color': '#1e293b',
      '--primary-text-color': '#f1f5f9',
      '--secondary-text-color': '#94a3b8',
      '--accent-color': '#10b981',
      '--link-hover-color': '#14b8a6',
      '--shadow-color': 'rgba(233, 178, 178, 0.2)',

      '--glow-color': 'rgba(43, 228, 166, 0.919)',
      '--glow-spread-color': 'rgba(23, 177, 126, 0.739)',
      '--enhanced-glow-color': 'rgb(131, 255, 214)',
      '--btn-color': 'rgb(4, 78, 54)',

    },
    light: {
       '--primary-bg-color': '#eae0d5',
        '--secondary-bg-color': '#c6ac8f',
        '--primary-text-color': '#0a0908',
        '--secondary-text-color': '#344E5B', 
        '--accent-color': '#9D876C',
        '--link-hover-color': '#F4F4F6',
        '--shadow-color': 'rgba(35, 27, 27, 0.368)',

        '--glow-color': 'rgba(241, 201, 151, 0.852)',
        '--glow-spread-color': 'rgba(155, 120, 77, 0.918)',
        '--enhanced-glow-color': 'rgb(157, 135, 108)',
        '--btn-color': 'rgb(144, 109, 65)',
    },
    b: {
        '--primary-bg-color': '#b8dbd9',
         '--secondary-bg-color': '#f4f4f9',
         '--primary-text-color': '#000000',
         '--secondary-text-color': '#263740', 
         '--accent-color': '#708A99',
         '--link-hover-color': '#14b8a6',
         '--shadow-color': 'rgba(35, 27, 27, 0.368)',

         '--glow-color': 'rgb(147, 182, 200)',
         '--glow-spread-color': 'rgba(90, 120, 136, 0.739)',
         '--enhanced-glow-color': 'rgb(139, 182, 205)',
         '--btn-color': 'rgb(53, 93, 115)',
     },
     c: {
        '--primary-bg-color': '#9FBCA5',
         '--secondary-bg-color': '#cad2c5',
         '--primary-text-color': '#000000',
         '--secondary-text-color': '#283C3E', 
         '--accent-color': '#52796f',
         '--link-hover-color': '#26BA81',
         '--shadow-color': 'rgba(35, 27, 27, 0.368)',

         '--glow-color': 'rgb(118, 192, 173)',
         '--glow-spread-color': 'rgba(81, 134, 121, 0.739)',
         '--enhanced-glow-color': 'rgb(178, 240, 225)',
         '--btn-color': 'rgb(53, 112, 96)',
     },
     spacecadet: {
        '--primary-bg-color': '#22223B',
         '--secondary-bg-color': '#4A4E69',
         '--primary-text-color': '#F2E9E4',
         '--secondary-text-color': '#C9ADA7', 
         '--accent-color': '#B679A4',
         '--link-hover-color': '#FF7088',
         '--shadow-color': 'rgba(233, 178, 178, 0.2)',

         '--glow-color': 'rgb(233, 161, 201)',
         '--glow-spread-color': 'rgba(182, 121, 153, 0.739)',
         '--enhanced-glow-color': 'rgb(239, 160, 215)',
         '--btn-color': 'rgb(137, 79, 119)',
     },
     midnightgreen: {
        '--primary-bg-color': '#083F49',
         '--secondary-bg-color': '#107F76',
         '--primary-text-color': '#DEEAF7',
         '--secondary-text-color': '#ADCBEB', 
         '--accent-color': '#508DE2',
         '--link-hover-color': '#6CA7F9',
         '--shadow-color': 'rgba(233, 178, 178, 0.2)',

         '--glow-color': 'rgb(143, 181, 234)',
         '--glow-spread-color': 'rgba(66, 126, 210, 0.739)',
         '--enhanced-glow-color': 'rgb(144, 184, 241)',
         '--btn-color': 'rgb(52, 110, 191)',
     },
     blackred: {
        '--primary-bg-color': '#000000',
         '--secondary-bg-color': '#379683',
         '--primary-text-color': '#D53434',
         '--secondary-text-color': '#981F1F', 
         '--accent-color': '#fff',
         '--link-hover-color': '#14b8a6',
         '--shadow-color': 'rgba(233, 178, 178, 0.2)',
     },
     hacker: {
        '--primary-bg-color': '#000000',
         '--secondary-bg-color': '#379683',
         '--primary-text-color': '#EDF5E1',
         '--secondary-text-color': '#8EE4af', 
         '--accent-color': '#fff',
         '--link-hover-color': '#14b8a6',
         '--shadow-color': 'rgba(233, 178, 178, 0.2)',
     },
     purp: {
        '--primary-bg-color': '#141414',
         '--secondary-bg-color': '#333333',
         '--primary-text-color': '#fff',
         '--secondary-text-color': '#B6C0CE', 
         '--accent-color': '#855CFF',
         '--link-hover-color': '#855CFF',
         '--shadow-color': 'rgba(233, 178, 178, 0.2)',

         '--glow-color': 'rgb(217, 176, 255)',
         '--glow-spread-color': 'rgba(191, 123, 255, 0.781)',
         '--enhanced-glow-color': 'rgb(231, 206, 255)',
         '--btn-color': 'rgb(100, 61, 136)',
     },
     futuregray: {
        '--primary-bg-color': '#2f4454',
         '--secondary-bg-color': '#5588B0',
         '--primary-text-color': '#fff',
         '--secondary-text-color': '#94a3b8', 
         '--accent-color': '#2E151B',
         '--link-hover-color': '#DA7B93',
         '--shadow-color': 'rgba(233, 178, 178, 0.2)',
     },
     minimalwarm: {
        '--primary-bg-color': '#EAE7DC',
         '--secondary-bg-color': '#D8C3A5',
         '--primary-text-color': '#FF7070',
         '--secondary-text-color': '#8E8D8A', 
         '--accent-color': '#AC0B00',
         '--link-hover-color': '#E01600',
         '--shadow-color': 'rgba(35, 27, 27, 0.368)',

         '--glow-color': 'rgb(252, 134, 134)',
         '--glow-spread-color': 'rgba(151, 20, 10, 0.739)',
         '--enhanced-glow-color': 'rgb(228, 99, 90)',
         '--btn-color': 'rgb(212, 14, 0)',
     }
    // Define more themes as needed
  };
  