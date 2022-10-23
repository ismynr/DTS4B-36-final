import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const TopCarts = () => {
  const itemData = [
    {
      img: 'https://c.saavncdn.com/editorial/wt15-49_20221021120328.jpg',
      title: 'Weekly Top Songs',
      featured: true,
      href: "",
    },
    {
      img: 'https://c.saavncdn.com/editorial/logo/charts_TrendingToday_183360_20220107111716.jpg',
      title: 'Trending Today',
      href: "",
    },
  ];

    return (
        <div className='color-item' style={{margin: "0 40em 0 40em"}}>
            <ImageList sx={{ width: '100%', height: '100%' }}>
            {itemData.map((item) => (
              <a href={item.href}>
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}?w=100&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=100&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={item.title}
                  />
                </ImageListItem>
              </a>
            ))}
          </ImageList>
        </div>
    )
}

export default TopCarts;