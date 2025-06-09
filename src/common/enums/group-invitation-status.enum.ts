/**
 * 그룹 초대 상태 ENUM
 * 그룹 내에서 초대가 가질 수 있는 상태를 나타냄.
 * @property {string} PENDING - 초대가 대기 중이며 아직 응답하지 않음.
 * @property {string} ACCEPTED - 관리자가 초대를 수락함.
 * @property {string} REJECTED - 관리자가 초대를 거절함.
 * @property {string} EXPIRED - 초대가 만료되어 더 이상 유효하지 않음.
 */
export enum GroupInvitationStatus {
  PENDING = 'pending',    // 대기 중
  ACCEPTED = 'accepted',  // 수락됨
  REJECTED = 'rejected',  // 거절됨
  EXPIRED = 'expired',    // 만료됨
}
