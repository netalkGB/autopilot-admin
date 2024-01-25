import 'modern-normalize'
import '../global.css'
import styles from './page.module.css'
import RotateIcon from '@/components/icon/RotateIcon'

export default function Page (): React.ReactNode {
  return (
    <>
      <h2>History</h2>
      <hr/>
      <div className={styles.historyList}>
        <div className={styles.historyTableContainer}>
          <div className={styles.historyListAction}>
            <div>
              <ul>
                <li><a href='#'><RotateIcon width={'14px'} height={'14px'}/>Reload</a></li>
              </ul>
            </div>
          </div>
          <table className={styles.historyTable}>
            <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Result</th>

            </tr>
            </thead>
            <tbody>
            <tr>
              <td>test</td>
              <td>2024-01-23T17:00:00.808Z</td>
              <td><span className={styles.failed}>Failed</span></td>
            </tr>
            <tr>
              <td>test</td>
              <td>2024-01-23T17:00:00.808Z</td>
              <td><span className={styles.success}>Success</span></td>
            </tr>
            <tr>
              <td>test</td>
              <td>2024-01-23T17:00:00.808Z</td>
              <td><span className={styles.success}>Success</span></td>
            </tr>
            <tr>
              <td>test</td>
              <td>2024-01-23T17:00:00.808Z</td>
              <td><span className={styles.success}>Success</span></td>
            </tr>
            <tr>
              <td>test</td>
              <td>2024-01-23T17:00:00.808Z</td>
              <td><span className={styles.success}>Success</span></td>
            </tr>
            <tr>
              <td>test</td>
              <td>2024-01-23T17:00:00.808Z</td>
              <td><span className={styles.success}>Success</span></td>
            </tr>
            <tr>
              <td>test</td>
              <td>2024-01-23T17:00:00.808Z</td>
              <td><span className={styles.success}>Success</span></td>
            </tr>
            <tr>
              <td>test</td>
              <td>2024-01-23T17:00:00.808Z</td>
              <td><span className={styles.success}>Success</span></td>
            </tr>
            <tr>
              <td>test</td>
              <td>2024-01-23T17:00:00.808Z</td>
              <td><span className={styles.success}>Success</span></td>
            </tr>
            <tr>
              <td>test</td>
              <td>2024-01-23T17:00:00.808Z</td>
              <td><span className={styles.success}>Success</span></td>
            </tr>
            <tr>
              <td>test</td>
              <td>2024-01-23T17:00:00.808Z</td>
              <td><span className={styles.success}>Success</span></td>
            </tr>
            <tr>
              <td>test</td>
              <td>2024-01-23T17:00:00.808Z</td>
              <td><span className={styles.success}>Success</span></td>
            </tr>
            <tr>
              <td>test</td>
              <td>2024-01-23T17:00:00.808Z</td>
              <td><span className={styles.success}>Success</span></td>
            </tr>
            <tr>
              <td>test</td>
              <td>2024-01-23T17:00:00.808Z</td>
              <td><span className={styles.success}>Success</span></td>
            </tr>
            <tr>
              <td>test</td>
              <td>2024-01-23T17:00:00.808Z</td>
              <td><span className={styles.success}>Success</span></td>
            </tr>
            <tr>
              <td>test</td>
              <td>2024-01-23T17:00:00.808Z</td>
              <td><span className={styles.success}>Success</span></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
