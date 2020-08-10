import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => createStyles({
  ticketList: {
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: "1px"
  }
}));
