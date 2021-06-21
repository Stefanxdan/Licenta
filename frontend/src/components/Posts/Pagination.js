import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }));  


export default function PaginationComp({postPerPage, totalPosts, paginate, setPostsPerPage, currentPage}) {
    const pageNumbers = [];
    const classes = useStyles();

    for(let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <>
            <div className="d-flex  justify-content-center mt-5 mb-4">
                <div className={classes.root}>
                    <Pagination count={Math.ceil(totalPosts / postPerPage)} variant="outlined" color="primary"
                        onChange ={(event, value) => {
                            paginate(value);
                          }}/>
                </div>
            </div>

            <div className="d-flex mb-5 justify-content-center align-items-center ">
                <TextField
                    id="standard-number"
                    label="Posts per page"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={postPerPage}
                    onChange={(event) => {
                        setPostsPerPage(event.target.value)
                        }}
                    />
            </div>
        </>
    )
}
