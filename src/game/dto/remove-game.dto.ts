import { CoreOutput } from '@app/common/dto/output.dto';
import { Game } from '../schema/game.schema';

export class RemoveGameOutput extends CoreOutput {
  game?: Game;
}
