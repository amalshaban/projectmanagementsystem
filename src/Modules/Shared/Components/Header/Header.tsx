
import Styles from "./Header.module.css";

export default function Header({ headerTitel }) {
  return (
    <div className={`${Styles.headerContainer} container-fluid`}>
      <div className={`${Styles.headerBg} text-white py-5 rounded-4 text-center text-md-start`}>
        <div className="content-header py-md-5 px-3 px-md-5 ">
          <h2 className="py-3 py-md-4">
            Welcome <span className="main-color">{headerTitel}</span>
          </h2>
          <h3>You can add project and assign tasks to your team</h3>
        </div>
      </div>
    </div>
  );
}
