import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {


    upvote() {
        return `Like user content`
    }

    downvote() {
        return `Unlike user content`
    }

    follow() {
        return `Follow user and increase followers count`
    }

    unfollow() {
        return `Unfollow user and decrease followers count`
    }
}
