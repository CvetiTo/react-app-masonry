import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { Counter } from "./Counter.js";
import Button from '@mui/material/Button';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { useEffect } from 'react';
import  DateObject  from "react-date-object";

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

export const SSRMasonry = ({
  items,
  deleteItemHandler
}) => {


  return (
    <Box sx={{ maxWidth: 1600, minHeight: 829, m: 20 }}>
      <Masonry columns={4} spacing={3}>
        {items.map((item, index) => (
          <div key={item._id}>
            <img
              src={`${item.img}?w=162&auto=format`}
              srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              style={{
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                display: 'block',
                width: '100%',
              }}
            />
            <Label>
              <section>
                <h3>{item.title}</h3>
                <h2>{new DateObject(item._createdOn).format("YYYY/MM/DD")}</h2>
              </section>
              <footer>
                <Counter />
                <Button variant="text" color='inherit'>See More<ReadMoreIcon /></Button>
                <Button onClick={() => deleteItemHandler(item._id)} variant="text" color='error'>Delete</Button>
              </footer>

              {`${index + 1} `}
            </Label>
          </div>

        ))}
      </Masonry>
    </Box>
  );
}

