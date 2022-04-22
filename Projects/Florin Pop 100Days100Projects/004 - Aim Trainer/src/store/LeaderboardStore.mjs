const LEADERBOARD_LOCAL_STORAGE_KEY = "Aim-Trainer-leaderboard-data";
class LeaderboardStore {
  getLeaderboardData() {
    return JSON.parse(localStorage.getItem(LEADERBOARD_LOCAL_STORAGE_KEY));
  }

  storeLeaderboardData(data) {
    localStorage.setItem(LEADERBOARD_LOCAL_STORAGE_KEY, JSON.stringify(data));
  }
}

const leaderboardStore = new LeaderboardStore();
export { leaderboardStore };

