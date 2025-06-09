/**
 * 그룹 내의 권한 ENUM
 * 그룹 내에서 가질 수 있는 권한을 나타냄.
 * @property {string} ADMIN - 그룹 관리자로.
 * @property {string} MEMBER - 일반 사용자.
 * @property {string} VIEWER - 제한된 권한을 가진 손님 사용자입니다.
 */
export enum GroupRole {
  ADMIN = 'admin',     // 관리자
  MEMBER = 'member',   // 일반 사용자
  VIEWER = 'viewer',   // 뷰어(읽기 전용)
}
