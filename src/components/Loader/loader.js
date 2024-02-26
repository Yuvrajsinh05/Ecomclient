import CircularProgress from "@mui/material/CircularProgress";
import styles from "./loader.module.css";

export const Loader = () => {
    return (
        <div className={styles.centerLoader}>
            <h1>Loading...</h1>
            <div className={styles.spinnerContainer}>
                <CircularProgress color="success" />
                <CircularProgress color="secondary" />
                <CircularProgress />
                <CircularProgress />
            </div>
        </div>
    );
};
