import {Match} from './Match';
import {RankingItem} from './RankingItem';

class Poule {
  public ranking: RankingItem[] = [];
  public matches: Match[] = [];

  constructor(public id: number, public name: string, public time: Date) {}
}
export default Poule;
