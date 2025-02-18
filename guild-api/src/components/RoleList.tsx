import styles from "./RoleList.module.css";

const RoleList = ({ roles }: { roles: Record<string, string> }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Roles</h2>
      <ul className={styles.list}>
        {Object.keys(roles).map((id) => (
          <li key={id} className={styles.roleItem}>
            <span className={styles.roleName}>{roles[id]}</span>
            <span className={styles.roleId}>#{id}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleList;