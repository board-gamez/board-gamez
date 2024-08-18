import { CoreOutput } from '@app/common/dto/output.dto';
import { Game } from '../schema/game.schema';

export class GetGameOutput extends CoreOutput {
  game?: Game;
}
