export const clusterLayer = {
    id: 'clusters',
    type: 'circle',
    source: 'adds',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': 
        ['step', ['get', 'point_count'], '#51bbd6', 50, '#847fff', 500, '#645efe'],
      'circle-radius': 
        ['step', ['get', 'point_count'], 15
        , 50, 20
        , 100, 25
        , 250, 30
        , 500, 35
        , 750, 40
        , 1000, 45
        , 1500, 50
        ]
    }
  };
  
  export const clusterCountLayer = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'adds',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12
    }
  };
  
  export const unclusteredPointLayer = {
    id: 'point',
    type: 'circle',
    source: 'adds',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': '#11b4da',
      'circle-radius': 6,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff'
    }
  };